const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

// Content file path
const contentFilePath = path.join(__dirname, '../config/content.json');

// Load content
function loadContent() {
  try {
    const data = fs.readFileSync(contentFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading content:', error);
    return null;
  }
}

// Save content
function saveContent(content) {
  try {
    fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving content:', error);
    return false;
  }
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../public/images');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images and ico files
  if (file.mimetype.startsWith('image/') || file.mimetype === 'image/x-icon' || file.mimetype === 'image/vnd.microsoft.icon') {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Admin credentials (hardcoded for security)
const ADMIN_CREDENTIALS = {
  email: 'admin@chinarfoundation.org',
  // Password: Admin@123 (hashed with SHA256)
  password: crypto.createHash('sha256').update('Admin@123').digest('hex')
};

// Session storage (in-memory for simplicity)
const sessions = new Map();

// Middleware to check authentication
function requireAuth(req, res, next) {
  const sessionId = req.headers['x-session-id'];
  
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const session = sessions.get(sessionId);
  if (Date.now() > session.expires) {
    sessions.delete(sessionId);
    return res.status(401).json({ success: false, message: 'Session expired' });
  }
  
  next();
}

// Home page
router.get('/', (req, res) => {
  const content = loadContent();
  res.render('index', {
    title: 'Chinar Charity Foundation - Helping Those in Need',
    submitted: false,
    content: content
  });
});

// Admin login page - Secret route
router.get('/9374205', (req, res) => {
  res.render('admin-login', {
    title: 'Admin Panel - Chinar Charity Foundation'
  });
});

// Admin login
router.post('/9374205/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }
  
  // Hash the provided password
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  
  // Check credentials
  if (email === ADMIN_CREDENTIALS.email && hashedPassword === ADMIN_CREDENTIALS.password) {
    // Create session
    const sessionId = crypto.randomBytes(32).toString('hex');
    sessions.set(sessionId, {
      email: email,
      expires: Date.now() + (2 * 60 * 60 * 1000) // 2 hours
    });
    
    res.json({ 
      success: true, 
      message: 'Login successful',
      sessionId: sessionId
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password' 
    });
  }
});

// Admin dashboard
router.get('/9374205/dashboard', (req, res) => {
  res.render('admin-dashboard', {
    title: 'Admin Dashboard - Chinar Charity Foundation'
  });
});

// Get content
router.get('/admin/content', requireAuth, (req, res) => {
  const content = loadContent();
  if (content) {
    res.json({ success: true, content: content });
  } else {
    res.status(500).json({ success: false, message: 'Failed to load content' });
  }
});

// Update home content
router.post('/admin/update-home', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { title, subtitle, description } = req.body;
  
  // Validate input
  if (!title || !subtitle || !description) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  content.home.title = title.trim();
  content.home.subtitle = subtitle.trim();
  content.home.description = description.trim();
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Home content updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Update mission content
router.post('/admin/update-mission', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { title, subtitle, heading, paragraph1, paragraph2, imagePosition } = req.body;
  
  // Validate input
  if (!title || !subtitle || !heading || !paragraph1 || !paragraph2) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  content.mission.title = title.trim();
  content.mission.subtitle = subtitle.trim();
  content.mission.heading = heading.trim();
  content.mission.paragraph1 = paragraph1.trim();
  content.mission.paragraph2 = paragraph2.trim();
  if (imagePosition) {
    content.mission.imagePosition = imagePosition;
  }
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Mission content updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Update about content
router.post('/admin/update-about', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { title, subtitle, heading, paragraph1, paragraph2, paragraph3, imagePosition } = req.body;
  
  // Validate input
  if (!title || !subtitle || !heading || !paragraph1 || !paragraph2 || !paragraph3) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  content.about.title = title.trim();
  content.about.subtitle = subtitle.trim();
  content.about.heading = heading.trim();
  content.about.paragraph1 = paragraph1.trim();
  content.about.paragraph2 = paragraph2.trim();
  content.about.paragraph3 = paragraph3.trim();
  if (imagePosition) {
    content.about.imagePosition = imagePosition;
  }
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'About content updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Upload image
router.post('/admin/upload-image', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ 
      success: false, 
      message: 'No image file provided' 
    });
  }
  
  const imageUrl = '/images/' + req.file.filename;
  res.json({ 
    success: true, 
    message: 'Image uploaded successfully',
    imageUrl: imageUrl
  });
});

// Upload logo or favicon with old file deletion
router.post('/admin/upload-branding', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ 
      success: false, 
      message: 'No file provided' 
    });
  }
  
  const { type } = req.body; // 'logo' or 'favicon'
  
  if (!type || (type !== 'logo' && type !== 'favicon')) {
    // Delete uploaded file if type is invalid
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid branding type' 
    });
  }
  
  // Validate file format
  if (type === 'logo' && req.file.mimetype !== 'image/png') {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ 
      success: false, 
      message: 'Logo must be in PNG format' 
    });
  }
  
  if (type === 'favicon' && req.file.mimetype !== 'image/x-icon' && req.file.mimetype !== 'image/vnd.microsoft.icon') {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ 
      success: false, 
      message: 'Favicon must be in ICO format' 
    });
  }
  
  // Load content to get old file path
  const content = loadContent();
  if (!content) {
    fs.unlinkSync(req.file.path);
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  // Get old file path and delete if exists
  let oldFilePath = null;
  if (type === 'logo' && content.logo) {
    oldFilePath = content.logo;
  } else if (type === 'favicon' && content.favicon) {
    oldFilePath = content.favicon;
  }
  
  // Delete old file if it exists and is not the default logo.png
  if (oldFilePath) {
    const fileName = oldFilePath.replace(/^\/images\//, '');
    if (fileName !== 'logo.png') { // Don't delete default logo
      const fullPath = path.join(__dirname, '../public/images', fileName);
      try {
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log(`Deleted old ${type}: ${fileName}`);
        }
      } catch (error) {
        console.error(`Error deleting old ${type}:`, error);
      }
    }
  }
  
  const imageUrl = '/images/' + req.file.filename;
  
  // Update content with new file
  if (type === 'logo') {
    content.logo = imageUrl;
  } else if (type === 'favicon') {
    content.favicon = imageUrl;
  }
  
  if (saveContent(content)) {
    res.json({ 
      success: true, 
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`,
      imageUrl: imageUrl
    });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Update section image
router.post('/admin/update-image', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { section, imageUrl } = req.body;
  
  if (!section || !imageUrl) {
    return res.status(400).json({ 
      success: false, 
      message: 'Section and image URL are required' 
    });
  }
  
  // Update based on section
  if (section === 'home') {
    content.home.backgroundImage = imageUrl;
  } else if (section === 'mission') {
    content.mission.image = imageUrl;
  } else if (section === 'about') {
    content.about.image = imageUrl;
  } else if (section === 'logo') {
    content.logo = imageUrl;
  } else if (section === 'favicon') {
    content.favicon = imageUrl;
  } else {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid section' 
    });
  }
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Image updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Delete image
router.post('/admin/delete-image', requireAuth, (req, res) => {
  const { imagePath } = req.body;
  
  if (!imagePath) {
    return res.status(400).json({ 
      success: false, 
      message: 'Image path is required' 
    });
  }
  
  // Remove leading slash and construct full path
  const fileName = imagePath.replace(/^\/images\//, '');
  const fullPath = path.join(__dirname, '../public/images', fileName);
  
  // Don't delete logo.png
  if (fileName === 'logo.png') {
    return res.status(400).json({ 
      success: false, 
      message: 'Cannot delete default logo' 
    });
  }
  
  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Image not found' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: 'Failed to delete image' });
  }
});

// Remove image from section (set to empty/null)
router.post('/admin/remove-section-image', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { section } = req.body;
  
  if (!section) {
    return res.status(400).json({ 
      success: false, 
      message: 'Section is required' 
    });
  }
  
  // Remove based on section
  if (section === 'mission') {
    content.mission.image = '';
  } else if (section === 'about') {
    content.about.image = '';
  } else {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid section. Only mission and about images can be removed.' 
    });
  }
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Image removed from section successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Add project
router.post('/admin/add-project', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { title, description, image, icon } = req.body;
  
  if (!title || !description || !image) {
    return res.status(400).json({ 
      success: false, 
      message: 'Title, description, and image are required' 
    });
  }
  
  const newProject = {
    id: Date.now(),
    title: title.trim(),
    description: description.trim(),
    image: image.trim(),
    icon: icon || 'fas fa-star'
  };
  
  content.projects.push(newProject);
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Project added successfully', project: newProject });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Update project
router.post('/admin/update-project', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { id, title, description, image, icon } = req.body;
  
  if (!id || !title || !description || !image) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  const projectIndex = content.projects.findIndex(p => p.id === parseInt(id));
  if (projectIndex === -1) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  
  content.projects[projectIndex] = {
    id: parseInt(id),
    title: title.trim(),
    description: description.trim(),
    image: image.trim(),
    icon: icon || content.projects[projectIndex].icon
  };
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Project updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Delete project
router.post('/admin/delete-project', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).json({ 
      success: false, 
      message: 'Project ID is required' 
    });
  }
  
  const projectIndex = content.projects.findIndex(p => p.id === parseInt(id));
  if (projectIndex === -1) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  
  content.projects.splice(projectIndex, 1);
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Project deleted successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Update impact stats
router.post('/admin/update-impact', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { title, subtitle, stats } = req.body;
  
  if (!title || !subtitle || !stats || !Array.isArray(stats)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid data provided' 
    });
  }
  
  content.impact.title = title.trim();
  content.impact.subtitle = subtitle.trim();
  content.impact.stats = stats.map(stat => ({
    number: stat.number.trim(),
    label: stat.label.trim(),
    icon: stat.icon || 'fas fa-star'
  }));
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Impact stats updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Add story
router.post('/admin/add-story', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { name, story, image } = req.body;
  
  if (!name || !story || !image) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name, story, and image are required' 
    });
  }
  
  const newStory = {
    id: Date.now(),
    name: name.trim(),
    story: story.trim(),
    image: image.trim()
  };
  
  content.stories.push(newStory);
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Story added successfully', story: newStory });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Update story
router.post('/admin/update-story', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { id, name, story, image } = req.body;
  
  if (!id || !name || !story || !image) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  const storyIndex = content.stories.findIndex(s => s.id === parseInt(id));
  if (storyIndex === -1) {
    return res.status(404).json({ success: false, message: 'Story not found' });
  }
  
  content.stories[storyIndex] = {
    id: parseInt(id),
    name: name.trim(),
    story: story.trim(),
    image: image.trim()
  };
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Story updated successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Delete story
router.post('/admin/delete-story', requireAuth, (req, res) => {
  const content = loadContent();
  if (!content) {
    return res.status(500).json({ success: false, message: 'Failed to load content' });
  }
  
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).json({ 
      success: false, 
      message: 'Story ID is required' 
    });
  }
  
  const storyIndex = content.stories.findIndex(s => s.id === parseInt(id));
  if (storyIndex === -1) {
    return res.status(404).json({ success: false, message: 'Story not found' });
  }
  
  content.stories.splice(storyIndex, 1);
  
  if (saveContent(content)) {
    res.json({ success: true, message: 'Story deleted successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

// Admin logout
router.post('/admin/logout', requireAuth, (req, res) => {
  const sessionId = req.headers['x-session-id'];
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// Handle form submission (original functionality)
router.post('/join', async (req, res) => {
  console.log('\n=== Form Submission Started ===');
  console.log('Received data:', JSON.stringify(req.body, null, 2));
  
  const { name, email, phone, age, state, country, message } = req.body;

  // Validation
  if (!name || !email || !phone || !age || !state || !country || !message) {
    console.error('❌ Validation Error: Missing required fields');
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required. Please fill out the complete form.' 
    });
  }

  // Check if email is configured
  const emailConfigured = process.env.SMTP_USER && 
                         process.env.SMTP_PASS && 
                         process.env.SMTP_USER !== 'your-email@gmail.com';

  if (!emailConfigured) {
    console.warn('⚠️  Email not configured - Saving submission to console only');
    console.log('\n📝 NEW MEMBER REGISTRATION:');
    console.log('============================');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Age: ${age}`);
    console.log(`State: ${state}`);
    console.log(`Country: ${country}`);
    console.log(`Message: ${message}`);
    console.log('============================\n');
    
    return res.json({ 
      success: true, 
      message: 'Thank you for joining us! Your application has been received.' 
    });
  }

  try {
    console.log('📧 Creating email transporter...');
    console.log(`SMTP Host: ${process.env.SMTP_HOST}`);
    console.log(`SMTP Port: ${process.env.SMTP_PORT}`);
    console.log(`SMTP User: ${process.env.SMTP_USER}`);
    
    // Create transporter with timeout settings and IPv4 support
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
      family: 4 // Force IPv4
    });

    console.log('✅ Transporter created, verifying connection...');
    
    // Verify connection
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('❌ SMTP Verification Failed:', verifyError.message);
      throw new Error(`SMTP connection failed: ${verifyError.message}`);
    }

    // Email content
    const mailOptions = {
      from: `"Chinar Charity Foundation" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: 'New Member Registration - Chinar Charity Foundation',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2ecc71; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-left: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Member Registration</h2>
            </div>
            <div class="content">
              <div class="field"><span class="label">Name:</span><span class="value">${name}</span></div>
              <div class="field"><span class="label">Email:</span><span class="value">${email}</span></div>
              <div class="field"><span class="label">Phone:</span><span class="value">${phone}</span></div>
              <div class="field"><span class="label">Age:</span><span class="value">${age}</span></div>
              <div class="field"><span class="label">State:</span><span class="value">${state}</span></div>
              <div class="field"><span class="label">Country:</span><span class="value">${country}</span></div>
              <div class="field">
                <div class="label">Message:</div>
                <div style="margin-top: 10px; padding: 10px; background: white; border-left: 3px solid #2ecc71;">${message}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    console.log('📤 Sending email...');
    console.log(`From: ${mailOptions.from}`);
    console.log(`To: ${mailOptions.to}`);
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    console.log('=== Form Submission Completed ===\n');
    
    res.json({ 
      success: true, 
      message: 'Thank you for joining us! We will contact you soon.' 
    });
  } catch (error) {
    console.error('\n❌ ERROR in form submission:');
    console.error('Error Type:', error.name);
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Full Error:', error);
    console.error('=== Form Submission Failed ===\n');
    
    // Log the submission data even if email fails
    console.log('\n📝 SUBMISSION DATA (Email failed but data captured):');
    console.log('============================');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Age: ${age}`);
    console.log(`State: ${state}`);
    console.log(`Country: ${country}`);
    console.log(`Message: ${message}`);
    console.log('============================\n');
    
    // Provide user-friendly error messages
    let userMessage = 'There was an error submitting your application. ';
    
    if (error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') {
      userMessage += 'Email service is temporarily unavailable. Your information has been logged and we will contact you soon.';
    } else if (error.code === 'EAUTH') {
      userMessage += 'Email authentication failed. Your information has been logged and we will contact you soon.';
    } else {
      userMessage += 'Please try again later or contact us directly.';
    }
    
    res.status(500).json({ 
      success: false, 
      message: userMessage,
      errorType: error.code || 'UNKNOWN'
    });
  }
});

module.exports = router;
