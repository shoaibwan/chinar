# Website Updates - January 2026

## Changes Made

### 1. **Admin Panel Security Enhancement**
- Changed admin panel route from `/admin` to `/9374205` for added security
- Login page now accessible only at `/9374205`
- Dashboard accessible at `/9374205/dashboard`
- All admin routes updated in:
  - `routes/main.js` (backend routes)
  - `public/js/admin.js` (frontend API calls)
  - `views/admin-login.ejs` (login page redirects)

### 2. **Logo and Favicon Integration**
- Logo uploaded from admin panel now automatically sets both:
  - Navigation bar logo
  - Favicon (browser tab icon)
- Implementation in `routes/main.js`:
  - When logo is uploaded, it's automatically copied to `public/favicon.ico`
  - Both logo and favicon use the same image file

### 3. **Image Management Enhancements**

#### A. Remove Image Functionality
- Added ability to remove images from Mission and About sections
- New API endpoint: `/admin/remove-section-image` (POST)
- New JavaScript function: `removeSectionImage(section)`
- "Remove Image" buttons added in admin dashboard for:
  - Mission section
  - About section
- When removed, content adjusts automatically (image section hidden)

#### B. Dynamic Content Adjustment
- Mission and About sections now conditionally display images
- If image is empty/removed, the section layout adjusts accordingly
- Updated in:
  - `views/partials/mission.ejs`
  - `views/partials/about.ejs`

### 4. **Impact Counter Animation Fix**
- Fixed NaN (Not a Number) display issue in impact statistics
- Enhanced counter animation with better validation:
  - Validates numeric format before animation
  - Handles formats like "50000+", "200+", etc.
  - Falls back to static display if format is invalid
  - Prevents NaN errors with proper checks
- Updated in `public/js/main.js`
- Added `data-target` attribute in `views/partials/impact.ejs`

### 5. **Smooth Scrolling Improvements**
- Fixed section scrolling to align perfectly with navbar
- Improved scroll offset calculation:
  - Dynamically calculates navbar height
  - Accounts for fixed navbar positioning
  - Smooth scroll to exact section positions
- Updated in `public/js/main.js`

### 6. **IPv4 Fallback for Network Connections**

#### A. Server Startup
- Added IPv4 fallback if IPv6 fails
- Server now tries IPv6 first, then IPv4 if unavailable
- Enhanced error handling for network issues
- Updated in `server.js`

#### B. Email Submission
- Form submission now uses IPv4 for email transport
- Added `family: 4` option to nodemailer configuration
- Prevents connection issues on IPv6-disabled systems
- Updated in `routes/main.js`

## File Changes Summary

### Modified Files:
1. `server.js` - IPv4 fallback for server startup
2. `routes/main.js` - Admin routes, logo/favicon handling, remove image endpoint, IPv4 email
3. `public/js/main.js` - Impact counter fix, smooth scrolling improvements
4. `public/js/admin.js` - Admin route updates, remove image function
5. `views/admin-login.ejs` - Updated login endpoint and redirect URLs
6. `views/admin-dashboard.ejs` - Added remove image buttons
7. `views/partials/mission.ejs` - Conditional image display
8. `views/partials/about.ejs` - Conditional image display
9. `views/partials/impact.ejs` - Added data-target attribute

### New Files:
- `UPDATES.md` - This documentation file

## Admin Credentials
- **Email:** admin@chinarfoundation.org
- **Password:** Admin@123
- **Admin Panel URL:** http://localhost:3000/9374205

## Testing Checklist

- [ ] Admin panel accessible at `/9374205`
- [ ] Login redirects to `/9374205/dashboard`
- [ ] Logo upload updates both navbar and favicon
- [ ] Mission image can be removed and section adjusts
- [ ] About image can be removed and section adjusts
- [ ] Impact counter displays correctly without NaN
- [ ] Smooth scrolling aligns with navbar properly
- [ ] Form submission works (check email sending)
- [ ] Server starts successfully (IPv4 fallback if needed)

## Notes

1. **Admin Route Security:** The `/9374205` route provides additional security through obscurity. For production, consider adding:
   - Rate limiting
   - CAPTCHA
   - Two-factor authentication

2. **Image Management:** When images are removed from sections, the layout automatically adjusts to display only text content.

3. **Impact Counter:** If you need to update impact statistics, use formats like:
   - "50000+" (will animate from 0 to 50000)
   - "200+" (will animate from 0 to 200)
   - Any other format will display statically

4. **Network:** The IPv4 fallback ensures compatibility with systems that have IPv6 disabled or unavailable.

## Support

For any issues or questions, refer to the original documentation files:
- `README.md` - Main project documentation
- `SETUP_GUIDE.md` - Setup instructions
- `ADMIN_DOCUMENTATION.md` - Admin panel guide
