# Admin Panel Documentation

## Overview
The Chinar Charity Foundation website now includes a comprehensive admin panel for managing all website content dynamically without touching code.

## Admin Access

### Login Credentials
- **URL**: `http://localhost:3000/admin`
- **Email**: `admin@chinarfoundation.org`
- **Password**: `Admin@123`

⚠️ **IMPORTANT**: For production deployment, please change these credentials in the `routes/main.js` file by updating the password hash.

## Features

### 1. Home Section Management
- Edit main title, subtitle, and description
- Upload and replace background image
- Images are automatically optimized and stored

### 2. Mission Section Management
- Update mission title, subtitle, and heading
- Edit two main paragraphs
- Replace mission section image
- Mission values (Compassion, Integrity, Community, Sustainability) are managed through the code

### 3. Projects Management
- **Add New Projects**: Create new project cards with title, description, icon, and image
- **View All Projects**: See all existing projects in a list
- **Delete Projects**: Remove projects that are no longer relevant
- Each project includes:
  - Title
  - Description
  - Image (uploaded via admin panel)
  - Font Awesome icon class (e.g., `fas fa-graduation-cap`)

### 4. Impact Statistics
- Update impact section title and subtitle
- Edit 4 statistics with custom numbers and labels:
  - Lives Impacted
  - Projects Completed
  - Volunteers
  - Communities Served

### 5. Stories Management
- **Add New Stories**: Create success story cards with name, content, and image
- **View All Stories**: Browse all success stories
- **Delete Stories**: Remove outdated stories
- Each story includes:
  - Story name/title
  - Story content (the actual story text)
  - Image

### 6. About Us Section
- Edit about section title, subtitle, and heading
- Update three main paragraphs describing the organization
- Replace about section image

### 7. Logo & Favicon Management
- Upload organization logo
- Logo is automatically used as:
  - Navigation bar logo
  - Browser favicon (tab icon)
  - Social media preview image
- **Recommended**: Square image (512x512px) with transparent background in PNG format

## Image Upload Guidelines

### Best Practices
- **Logo**: 512x512px or 256x256px, PNG with transparent background
- **Background Image**: 1920x1080px or larger for full-width display
- **Section Images**: 800x600px for good quality
- **Project/Story Images**: 600x400px for consistent display
- **File Size**: Maximum 5MB per file
- **Format**: JPG for photos, PNG for graphics/logos

### Optimization Tips
1. Compress images before uploading to reduce load times
2. Use appropriate dimensions to avoid slow page loads
3. Use transparent PNG for logos
4. Use high-quality JPG for background and section images

## Security Features

### Authentication
- Secure login with email and password
- SHA-256 password hashing
- Session-based authentication
- 2-hour session timeout
- Logout functionality

### Form Validation
- Input sanitization on all forms
- Required field validation
- File type validation (images only)
- File size validation (5MB maximum)
- XSS protection through EJS templating
- CSRF protection via session validation

### Attack Prevention
1. **SQL Injection**: N/A (using JSON file storage)
2. **XSS (Cross-Site Scripting)**: Protected via EJS escaping
3. **File Upload Attacks**: Strict file type and size validation
4. **Session Hijacking**: Session ID stored in localStorage with expiration
5. **Brute Force**: Can be enhanced with rate limiting (not implemented)

## Technical Details

### Architecture
- **Backend**: Node.js with Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Data Storage**: JSON file (`config/content.json`)
- **File Uploads**: Multer middleware
- **Authentication**: Custom session management

### File Structure
```
├── config/
│   └── content.json          # All website content
├── public/
│   ├── css/
│   │   └── style.css         # Main styles + admin styles
│   ├── js/
│   │   ├── main.js          # Frontend JavaScript
│   │   └── admin.js         # Admin panel JavaScript
│   └── images/              # Uploaded images directory
├── routes/
│   └── main.js              # All routes including admin
├── views/
│   ├── admin-login.ejs      # Admin login page
│   ├── admin-dashboard.ejs  # Admin dashboard
│   ├── index.ejs            # Main website page
│   └── partials/            # Page sections
└── server.js                # Express server
```

### API Endpoints

#### Authentication
- `POST /admin/login` - Admin login
- `POST /admin/logout` - Admin logout

#### Content Management
- `GET /admin/content` - Get all content
- `POST /admin/update-home` - Update home section
- `POST /admin/update-mission` - Update mission section
- `POST /admin/update-about` - Update about section
- `POST /admin/update-impact` - Update impact statistics

#### Image Management
- `POST /admin/upload-image` - Upload new image
- `POST /admin/update-image` - Update section image reference
- `POST /admin/delete-image` - Delete uploaded image

#### Projects Management
- `POST /admin/add-project` - Add new project
- `POST /admin/update-project` - Update existing project
- `POST /admin/delete-project` - Delete project

#### Stories Management
- `POST /admin/add-story` - Add new story
- `POST /admin/update-story` - Update existing story
- `POST /admin/delete-story` - Delete story

## Changing Admin Credentials

### To Change Password:
1. Open `routes/main.js`
2. Find the `ADMIN_CREDENTIALS` constant (around line 40)
3. Generate a new SHA-256 hash of your desired password:
   ```javascript
   const crypto = require('crypto');
   const newPassword = 'YourNewPassword123';
   const hash = crypto.createHash('sha256').update(newPassword).digest('hex');
   console.log(hash);
   ```
4. Replace the password hash in the code
5. To change email, simply update the `email` field

## Troubleshooting

### Cannot Login
- Clear browser localStorage
- Check console for errors
- Verify credentials are correct
- Ensure server is running

### Images Not Uploading
- Check file size (must be < 5MB)
- Verify file is an image format
- Check `public/images` directory permissions
- Look for errors in browser console

### Content Not Updating
- Check browser console for errors
- Verify session is still valid (not expired)
- Check `config/content.json` file permissions
- Reload the page and try again

### Session Expired
- Sessions expire after 2 hours of inactivity
- Simply login again to create a new session

## Backup and Restore

### Backup Content
The entire website content is stored in `config/content.json`. To backup:
```bash
cp config/content.json config/content.backup.json
```

### Restore Content
To restore from backup:
```bash
cp config/content.backup.json config/content.json
```

### Backup Images
All uploaded images are in `public/images/`. To backup:
```bash
tar -czf images-backup.tar.gz public/images/
```

## Production Deployment Checklist

- [ ] Change admin password
- [ ] Set strong session secret
- [ ] Enable HTTPS
- [ ] Add rate limiting for login attempts
- [ ] Set up regular backups
- [ ] Configure file upload limits
- [ ] Add IP whitelist for admin panel (optional)
- [ ] Set up monitoring and logging
- [ ] Test all features thoroughly
- [ ] Remove console.log statements from production code

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Check server logs for backend errors
4. Ensure all dependencies are installed: `npm install`

## Version History

### Version 2.0 (Current)
- Added comprehensive admin panel
- Dynamic content management
- Image upload and management
- Project and story CRUD operations
- Logo and favicon management
- Security enhancements
- Session-based authentication

### Version 1.0
- Initial static website
- Contact form functionality
- Email notifications
