# Update Notes - Version 3

## Logo & Favicon Management Enhancement

### Date: January 14, 2026

---

## 🎯 What's New

This update introduces **separate upload management** for Logo and Favicon in the admin panel with improved file handling and automatic old file deletion.

---

## ✨ Key Features

### 1. **Separate Logo Upload Section**
- **Location**: Admin Dashboard → Logo & Favicon Tab
- **Format Required**: PNG only
- **Recommended Size**: 512x512px or larger for optimal clarity
- **File Size Limit**: 5MB maximum
- **Features**:
  - Validates PNG format (rejects other formats)
  - Shows image preview after upload
  - Automatically deletes old logo file when new one is uploaded
  - Preserves default logo.png (doesn't delete it)

### 2. **Separate Favicon Upload Section**
- **Location**: Admin Dashboard → Logo & Favicon Tab
- **Format Required**: ICO only (not PNG or JPG)
- **File Size Limit**: 1MB maximum
- **Features**:
  - Validates ICO format strictly
  - No automatic conversion from PNG/JPG to ICO
  - Shows confirmation message after upload
  - Automatically deletes old favicon file when new one is uploaded
  - Updates browser tab icon dynamically in admin panel
  - Prompts to reload page to see new favicon

### 3. **Automatic File Management**
- **Old File Deletion**: When you upload a new logo or favicon, the old file is automatically deleted from the server
- **Exception**: Default logo.png is protected and won't be deleted
- **Clean Storage**: Prevents accumulation of unused files

---

## 🔧 Technical Changes

### Files Modified

1. **`views/admin-dashboard.ejs`**
   - Separated Logo and Favicon into two distinct cards
   - Added clear instructions for each upload type
   - Updated file input to accept only specific formats

2. **`routes/main.js`**
   - Added new route: `/admin/upload-branding`
   - Implements format validation (PNG for logo, ICO for favicon)
   - Automatic old file deletion logic
   - Enhanced error handling with descriptive messages

3. **`public/js/admin.js`**
   - Added new function: `uploadBrandingFile(type, input)`
   - Client-side format validation
   - Separate handling for logo and favicon uploads
   - Dynamic favicon update in browser
   - Improved user feedback with success/error messages

4. **`config/content.json`**
   - Already supports separate `logo` and `favicon` fields
   - No changes needed (backward compatible)

---

## 📋 Usage Instructions

### How to Upload Logo

1. Log in to Admin Dashboard
2. Navigate to **Logo & Favicon** tab
3. In the **Logo Upload** section:
   - Prepare your logo as PNG format (512x512px or larger recommended)
   - Click "Click to upload logo (PNG only)"
   - Select your PNG file
   - Wait for upload confirmation
   - Logo will appear in preview and be immediately active on the website

### How to Upload Favicon

1. Log in to Admin Dashboard
2. Navigate to **Logo & Favicon** tab
3. In the **Favicon Upload** section:
   - **Important**: Convert your image to ICO format first
   - Use online tools like:
     - favicon.io
     - convertio.co
     - realfavicongenerator.net
   - ICO files can contain multiple sizes (16x16, 32x32, 48x48)
   - Click "Click to upload favicon (ICO only)"
   - Select your ICO file
   - Wait for upload confirmation
   - Reload the page when prompted to see the new favicon

---

## ⚠️ Important Notes

### Favicon Format
- **We do NOT convert PNG/JPG to ICO automatically**
- You must upload a proper ICO file
- This ensures proper multi-size support for different devices
- ICO files can be created from PNG using online converters

### File Size Limits
- **Logo**: Maximum 5MB
- **Favicon**: Maximum 1MB

### File Validation
- Logo: Only accepts PNG format
- Favicon: Only accepts ICO format
- Invalid formats are rejected with clear error messages

### Old File Management
- Old logo/favicon files are automatically deleted when new ones are uploaded
- Default `logo.png` is protected and won't be deleted
- Keeps your `/public/images` folder clean

### Browser Caching
- After uploading a new favicon, you may need to:
  1. Reload the page (as prompted)
  2. Clear browser cache if favicon doesn't update immediately
  3. Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

---

## 🛠️ For Developers

### New API Endpoint

```javascript
POST /admin/upload-branding
Headers: { 'X-Session-Id': sessionId }
Body: FormData with:
  - image: File (logo or favicon)
  - type: 'logo' or 'favicon'

Response:
{
  success: true,
  message: "Logo uploaded successfully",
  imageUrl: "/images/1234567890-logo.png"
}
```

### Format Validation Logic

**Server-side (routes/main.js)**:
```javascript
// Logo: Must be PNG
if (type === 'logo' && req.file.mimetype !== 'image/png') {
  // Reject and delete uploaded file
}

// Favicon: Must be ICO
if (type === 'favicon' && 
    req.file.mimetype !== 'image/x-icon' && 
    req.file.mimetype !== 'image/vnd.microsoft.icon') {
  // Reject and delete uploaded file
}
```

**Client-side (admin.js)**:
```javascript
// Logo validation
if (type === 'logo' && file.type !== 'image/png') {
  showAlert('Logo must be in PNG format', 'error');
  return;
}

// Favicon validation
if (type === 'favicon' && 
    file.type !== 'image/x-icon' && 
    file.type !== 'image/vnd.microsoft.icon') {
  showAlert('Favicon must be in ICO format', 'error');
  return;
}
```

### File Deletion Logic

```javascript
// Get old file path from content.json
let oldFilePath = type === 'logo' ? content.logo : content.favicon;

// Delete old file (except default logo.png)
if (oldFilePath) {
  const fileName = oldFilePath.replace(/^\/images\//, '');
  if (fileName !== 'logo.png') {
    const fullPath = path.join(__dirname, '../public/images', fileName);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
}
```

---

## 🎨 UI/UX Improvements

1. **Clear Instructions**: Each upload section has detailed instructions
2. **Format Hints**: File format requirements are clearly stated
3. **Size Recommendations**: Optimal sizes are provided
4. **Visual Feedback**: Upload progress and status indicators
5. **Error Messages**: Descriptive error messages for failed uploads
6. **Success Confirmation**: Clear success messages with next steps

---

## 🔄 Migration from Previous Versions

If you're upgrading from an earlier version:

1. **Backup your `config/content.json`** file
2. **Backup your `/public/images`** folder
3. Replace the updated files
4. Your existing logo and favicon settings will be preserved
5. Test the upload functionality in the admin panel

---

## 🐛 Known Issues / Limitations

1. **Browser Caching**: Favicons are heavily cached by browsers. Users may need to clear cache or hard refresh to see new favicon.
2. **ICO Format Only**: We strictly require ICO format for favicons - no automatic conversion to ensure quality.
3. **No Bulk Upload**: Logo and favicon must be uploaded separately (this is intentional for better control).

---

## 📚 Resources

### Favicon Generators
- [favicon.io](https://favicon.io) - Simple and free
- [realfavicongenerator.net](https://realfavicongenerator.net) - Advanced with multi-platform support
- [convertio.co](https://convertio.co/png-ico/) - Format converter

### Image Optimization
- [TinyPNG](https://tinypng.com) - Compress PNG files
- [Squoosh](https://squoosh.app) - Image optimization tool
- [ImageOptim](https://imageoptim.com) - Mac app for image optimization

---

## 📞 Support

If you encounter any issues with logo/favicon uploads:

1. Check browser console for error messages
2. Verify file format (PNG for logo, ICO for favicon)
3. Ensure file size is within limits
4. Try clearing browser cache
5. Check server logs for detailed error information

---

## 🎉 Summary

This update provides a professional, separated management system for logo and favicon with:
- ✅ Strict format validation
- ✅ Automatic old file deletion
- ✅ Clear user instructions
- ✅ Better organization in admin panel
- ✅ Improved error handling
- ✅ Clean file management

Enjoy your improved branding management system!
