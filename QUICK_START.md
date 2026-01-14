# Quick Start Guide - Admin Panel

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

3. **Access the Website**
   - Main Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## Admin Login

- **Email**: admin@chinarfoundation.org
- **Password**: Admin@123

⚠️ **Change these credentials before deploying to production!**

## First Time Setup

1. **Login to Admin Panel**
   - Go to http://localhost:3000/admin
   - Enter credentials above
   - Click "Login"

2. **Upload Your Logo**
   - Click "Logo & Favicon" tab
   - Upload your organization's logo (square image recommended)
   - This will update the navbar logo and browser favicon

3. **Update Home Section**
   - Click "Home" tab
   - Update title, subtitle, and description
   - Upload a background image (high resolution recommended)
   - Click "Save Changes"

4. **Add Your Projects**
   - Click "Projects" tab
   - Scroll to "Add New Project"
   - Fill in title, description, and icon class
   - Upload project image
   - Click "Add Project"

5. **Add Success Stories**
   - Click "Stories" tab
   - Scroll to "Add New Story"
   - Fill in story name and content
   - Upload story image
   - Click "Add Story"

6. **Update Other Sections**
   - Navigate through Mission, Impact, and About Us tabs
   - Update text content as needed
   - Upload section images
   - Click "Save Changes" for each section

## Content Management Tips

### Text Editing
- Keep titles short and impactful
- Use clear, engaging language
- Break long paragraphs into smaller ones
- Proofread before saving

### Image Selection
- Use high-quality images
- Ensure images are relevant to the content
- Compress images before uploading
- Use consistent image styles

### Projects & Stories
- Add 4-6 projects for best display
- Keep project descriptions concise
- Add 3-6 stories for variety
- Update content regularly

## Font Awesome Icons

For project icons, use Font Awesome icon classes:
- Education: `fas fa-graduation-cap`
- Healthcare: `fas fa-heartbeat`
- Food: `fas fa-utensils`
- Women: `fas fa-female`
- Community: `fas fa-users`
- Environment: `fas fa-leaf`
- Technology: `fas fa-laptop`
- Sports: `fas fa-futbol`

Browse more icons at: https://fontawesome.com/icons

## Recommended Image Sizes

| Section | Recommended Size | Format |
|---------|------------------|--------|
| Logo | 512x512px | PNG (transparent) |
| Background | 1920x1080px | JPG |
| Mission Image | 800x600px | JPG |
| About Image | 800x600px | JPG |
| Project Images | 600x400px | JPG |
| Story Images | 600x400px | JPG |

## Common Tasks

### Change Background Image
1. Go to Admin Panel → Home tab
2. Click upload area under "Background Image"
3. Select new image
4. Wait for upload to complete

### Add New Project
1. Go to Admin Panel → Projects tab
2. Scroll to "Add New Project"
3. Fill in all fields
4. Select an icon class from Font Awesome
5. Upload project image
6. Click "Add Project"

### Delete a Project/Story
1. Navigate to respective tab
2. Find the item in the list
3. Click "Delete" button
4. Confirm deletion

### Update Impact Statistics
1. Go to Admin Panel → Impact tab
2. Update numbers and labels for each statistic
3. Click "Save Changes"

## Security Reminders

1. **Never share admin credentials**
2. **Use strong passwords**
3. **Logout after making changes**
4. **Regular backups of content.json**
5. **Change default password immediately**

## Troubleshooting

### Can't Login
- Clear browser cache and cookies
- Try incognito/private mode
- Check console for errors (F12)

### Image Won't Upload
- Check file size (< 5MB)
- Ensure file is an image
- Try a different browser
- Check internet connection

### Changes Not Showing
- Click "Save Changes" button
- Refresh the main website
- Clear browser cache
- Check for error messages

## Support

For detailed documentation, see `ADMIN_DOCUMENTATION.md`

For technical issues:
1. Check browser console (F12)
2. Check server terminal for errors
3. Verify all dependencies are installed
4. Restart the server

## Next Steps

1. ✅ Complete initial setup
2. ✅ Upload all content
3. ✅ Test all features
4. ✅ Review on mobile devices
5. ✅ Change admin password
6. ✅ Set up email (SMTP) for contact form
7. ✅ Deploy to production
8. ✅ Set up SSL certificate

---

**Ready to go live?**
See `ADMIN_DOCUMENTATION.md` for production deployment checklist!
