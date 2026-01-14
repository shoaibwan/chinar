# Chinar Charity Foundation Website

A modern, responsive website for the Chinar Charity Foundation NGO with a comprehensive admin panel for content management. Built with Node.js, Express, and EJS.

## 🎉 New Features - Version 2.0

### 🔐 Admin Panel
- **Complete Content Management System** - Update all website content without coding
- **Secure Authentication** - Login with email and password
- **Image Management** - Upload, replace, and delete images
- **Dynamic Content** - All text and images are now editable through admin panel
- **Session-Based Security** - 2-hour sessions with automatic expiration

### 📝 Content Management
- Edit Home, Mission, Projects, Impact, Stories, and About sections
- Add/Delete projects and success stories
- Upload and manage logo (also updates favicon)
- Update impact statistics
- Manage all section images

### 🛡️ Security Features
- SHA-256 password hashing
- Form validation and sanitization
- File upload restrictions (type and size)
- XSS protection
- Session management

## Features

- ✅ **Admin Panel** for complete content management (NEW!)
- ✅ Responsive design that works on all devices
- ✅ Contact form with validation
- ✅ Email notifications for new member registrations
- ✅ Smooth scrolling and animations
- ✅ Dynamic content loading from JSON
- ✅ Image upload and management
- ✅ Logo and favicon management
- ✅ Secure authentication system
- ✅ Works even without email configuration (logs to console)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### 3. Access the Website
- **Main Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

### 4. Admin Login
- **Email**: `admin@chinarfoundation.org`
- **Password**: `Admin@123`

⚠️ **IMPORTANT**: Change these credentials before production deployment!

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get started quickly with the admin panel
- **[Admin Documentation](ADMIN_DOCUMENTATION.md)** - Complete admin panel guide
- **[Setup Guide](SETUP_GUIDE.md)** - Detailed installation and configuration
- **[Features](FEATURES.md)** - All website features
- **[Changelog](CHANGELOG.md)** - Version history

## Admin Panel Access

### Navigation
The admin panel link is available in the main navigation menu at the top right: **"Admin Panel"**

### Features Overview

#### 1. Home Section
- Edit title, subtitle, and description
- Upload background image

#### 2. Mission Section
- Update mission content
- Replace mission image

#### 3. Projects Management
- Add new projects with images
- Delete existing projects
- Custom Font Awesome icons

#### 4. Impact Statistics
- Update all 4 statistics
- Custom numbers and labels

#### 5. Stories Management
- Add success stories with images
- Delete outdated stories

#### 6. About Us Section
- Edit about content (3 paragraphs)
- Replace about image

#### 7. Logo & Favicon
- Upload organization logo
- Automatically updates favicon

### Image Guidelines

| Section | Recommended Size | Format |
|---------|------------------|--------|
| Logo | 512x512px | PNG (transparent) |
| Background | 1920x1080px | JPG |
| Section Images | 800x600px | JPG |
| Project/Story | 600x400px | JPG |

**File Size Limit**: 5MB per image

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. **Extract Files**
   Extract the website files to your desired directory

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment (Optional)**
   - Copy `.env.example` to `.env`
   - Update email configuration if needed
   - Email configuration is optional; form submissions will log to console if not configured

4. **Start the Server**
   ```bash
   npm start
   ```

5. **Access the Website**
   - Website: http://localhost:3000
   - Admin: http://localhost:3000/admin

## Project Structure

```
chinar-ngo-website-fixed/
├── config/
│   └── content.json          # All website content (dynamic)
├── public/
│   ├── css/
│   │   └── style.css        # All styles
│   ├── js/
│   │   ├── main.js          # Frontend JavaScript
│   │   └── admin.js         # Admin panel JavaScript
│   ├── images/              # Uploaded images
│   └── videos/              # Video files
├── routes/
│   └── main.js              # All routes (public + admin)
├── views/
│   ├── admin-login.ejs      # Admin login page
│   ├── admin-dashboard.ejs  # Admin dashboard
│   ├── index.ejs            # Main page template
│   └── partials/            # Page sections
│       ├── navbar.ejs
│       ├── home.ejs
│       ├── mission.ejs
│       ├── projects.ejs
│       ├── impact.ejs
│       ├── stories.ejs
│       ├── about.ejs
│       ├── contact.ejs
│       └── footer.ejs
├── .env                     # Environment variables
├── server.js                # Express server
├── package.json             # Dependencies
├── README.md                # This file
├── QUICK_START.md          # Quick start guide
├── ADMIN_DOCUMENTATION.md  # Admin panel docs
└── SETUP_GUIDE.md          # Setup instructions
```

## Email Configuration (Optional)

The contact form can send email notifications. If not configured, submissions are logged to the console.

Edit `.env` file:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=recipient@example.com
```

For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in SMTP_PASS

## Security Notes

### Changing Admin Password

1. Open `routes/main.js`
2. Find `ADMIN_CREDENTIALS` constant
3. Generate new hash:
   ```javascript
   const crypto = require('crypto');
   const hash = crypto.createHash('sha256').update('YourNewPassword').digest('hex');
   console.log(hash);
   ```
4. Replace the password hash

### Production Checklist
- [ ] Change admin credentials
- [ ] Enable HTTPS
- [ ] Set up regular backups
- [ ] Configure file upload limits
- [ ] Add rate limiting
- [ ] Remove console.log statements
- [ ] Test all features

## Content Backup

### Backup Content
```bash
cp config/content.json config/content.backup.json
```

### Backup Images
```bash
tar -czf images-backup.tar.gz public/images/
```

## Troubleshooting

### Admin Panel Issues
- Clear browser localStorage
- Check browser console (F12)
- Verify session hasn't expired (2 hours)
- Ensure server is running

### Image Upload Issues
- Check file size (< 5MB)
- Verify file is an image
- Check directory permissions
- Look for console errors

### Content Not Updating
- Click "Save Changes" button
- Refresh the page
- Check `config/content.json` permissions
- Verify session is valid

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS
- **File Uploads**: Multer
- **Styling**: CSS3 (Custom)
- **Icons**: Font Awesome 6
- **Email**: Nodemailer
- **Data Storage**: JSON file

## Features by Section

### Home Section
- Dynamic hero section with background image
- Editable title, subtitle, and description
- Call-to-action buttons

### Mission Section
- Mission statement with values
- Editable content and image
- Icon-based value display

### Projects Section
- Dynamic project cards
- Custom icons per project
- Add/Delete functionality

### Impact Section
- Statistics counter
- Customizable metrics
- Testimonial section

### Stories Section
- Success stories carousel
- Image and text content
- Dynamic story management

### About Section
- Organization information
- Team highlights
- Certification badges

### Contact Section
- Membership form
- Email notifications
- Form validation

## Development

### Adding New Features
1. Update `routes/main.js` for backend
2. Add views in `views/` directory
3. Update frontend in `public/js/`
4. Add styles in `public/css/style.css`

### Testing
1. Test all admin features
2. Verify image uploads
3. Check responsive design
4. Test form submissions
5. Verify email notifications

## License

MIT License - Feel free to use for your organization

## Support

For issues or questions:
1. Check documentation files
2. Review troubleshooting section
3. Check browser console for errors
4. Verify all dependencies are installed

## Version History

### Version 2.0 (Current)
- ✨ Complete admin panel
- ✨ Dynamic content management
- ✨ Image upload system
- ✨ Secure authentication
- ✨ Project/Story CRUD operations
- ✨ Logo and favicon management

### Version 1.0
- Initial release
- Static content
- Contact form
- Email notifications

## Contributing

Contributions are welcome! Please ensure:
- Code is well-documented
- Features are tested
- Security best practices are followed

## Credits

Built with ❤️ for Chinar Charity Foundation

---

**Ready to get started?** Read the [Quick Start Guide](QUICK_START.md)!

**Need help?** Check the [Admin Documentation](ADMIN_DOCUMENTATION.md)!
