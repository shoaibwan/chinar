# Chinar NGO Website - Updated Version

## 🎉 New Features Added

This updated version includes several enhancements to the admin panel and website functionality:

### 1. **Separate Logo and Favicon Upload**
- **Logo Upload**: Upload your organization's logo that appears in the navigation bar
  - Recommended format: PNG with transparent background
  - Recommended size: 200x60px to 400x120px (rectangular)
  - Accepted formats: JPG, JPEG, PNG, WebP
  - Maximum file size: 5MB

- **Favicon Upload**: Upload your favicon (browser tab icon) separately
  - Recommended format: ICO or PNG
  - Recommended size: 32x32px or 64x64px (square)
  - Accepted formats: ICO, PNG, JPG
  - Maximum file size: 1MB
  - Note: Square images work best for favicons

### 2. **Image Position Control for Mission & About Sections**
Admins can now choose where to display images in Mission and About sections:
- **Right side** (default for Mission)
- **Left side** (default for About)
- **Top** (full width above content)
- **Bottom** (full width below content)

This provides more flexibility in content layout and design.

### 3. **Enhanced Image Upload Guidelines**
The admin panel now displays detailed guidelines for each image upload:
- Accepted file formats
- Recommended dimensions
- Maximum file sizes
- Best practices for optimization
- Usage context

### 4. **Improved Desktop Layout**
- Fixed desktop layout to stay within proper container width (1200px max)
- Images and content maintain appropriate sizing
- Better responsive behavior across different screen sizes

## 📂 File Changes

### Modified Files:
1. **config/content.json** - Added `imagePosition` and `favicon` fields
2. **views/index.ejs** - Updated to use separate favicon field
3. **views/partials/mission.ejs** - Added support for image positioning
4. **views/partials/about.ejs** - Added support for image positioning
5. **views/admin-dashboard.ejs** - Enhanced with new controls and guidelines
6. **public/css/style.css** - Added CSS for image positioning and layout fixes
7. **public/js/admin.js** - Updated to handle new features
8. **routes/main.js** - Updated backend routes to handle favicon and image positions

## 🎨 Admin Panel Updates

### Logo & Favicon Tab (formerly "Logo")
Navigate to the "Logo & Favicon" tab in the admin panel to:
- Upload logo separately for navigation bar
- Upload favicon separately for browser tabs
- View detailed upload guidelines for each

### Mission Section
- Added **Image Position** dropdown with 4 options
- Choose how the image is displayed relative to content

### About Section
- Added **Image Position** dropdown with 4 options
- Choose how the image is displayed relative to content

## 🚀 How to Use

### Uploading Logo and Favicon:
1. Log in to admin panel (route: `/9374205`)
2. Click on "Logo & Favicon" tab
3. Upload logo in the first card
4. Upload favicon in the second card
5. Both will be saved and applied automatically

### Setting Image Position:
1. Go to "Mission" or "About Us" tab
2. Scroll to the bottom of the content form
3. Select desired position from "Image Position" dropdown:
   - **Right side**: Image appears on the right of content (2-column layout)
   - **Left side**: Image appears on the left of content (2-column layout)
   - **Top**: Image spans full width above content
   - **Bottom**: Image spans full width below content
4. Click "Save Changes"

## 📱 Responsive Behavior

- **Desktop (>768px)**: 
  - Left/Right positions create 2-column layout
  - Top/Bottom positions span full width
  - Container max-width: 1200px
  
- **Mobile (≤768px)**:
  - All layouts stack vertically
  - Images display full width
  - Optimal touch targets maintained

## 🔧 Technical Details

### Content JSON Structure:
```json
{
  "mission": {
    "title": "...",
    "image": "...",
    "imagePosition": "right" // or "left", "top", "bottom"
  },
  "about": {
    "title": "...",
    "image": "...",
    "imagePosition": "left" // or "right", "top", "bottom"
  },
  "logo": "/images/logo.png",
  "favicon": "/images/favicon.png"
}
```

### CSS Classes:
- `.image-top` - Applied when position is "top"
- `.image-bottom` - Applied when position is "bottom"
- `.full-width` - Applied to images in top/bottom positions

## 📝 Installation & Setup

1. Extract the zip file
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`
4. Run the server:
   ```bash
   node server.js
   ```
5. Access admin panel: `http://localhost:3000/9374205`

## 🔐 Default Admin Credentials

- **Email**: admin@chinarfoundation.org
- **Password**: Admin@123

**Important**: Change these credentials in production!

## 💡 Tips

1. **Logo**: Use PNG with transparent background for best results
2. **Favicon**: Square images (32x32 or 64x64) work best
3. **Section Images**: Use high-quality images (800x600 or larger)
4. **File Size**: Compress images before uploading using tools like TinyPNG
5. **Testing**: Always preview the website after making changes

## 🆘 Support

For issues or questions:
1. Check the admin documentation in the dashboard
2. Review the image upload guidelines
3. Ensure file formats and sizes meet requirements

## 📄 License

This project is part of the Chinar Charity Foundation website system.

---

**Version**: 2.0  
**Last Updated**: January 2026  
**Maintained by**: Chinar Charity Foundation Development Team
