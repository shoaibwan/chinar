# Chinar Charity Foundation Website - Updated Version

## Changes Made

### 1. Logo Integration
- **Navbar Logo**: The text "Chinar Charity Foundation" has been replaced with a logo image
- **Logo Sources**: 
  - Primary: `/public/images/logo.png` (place your logo here)
  - Fallback: Online charity icon from Icons8 (https://img.icons8.com/fluency/96/000000/charity.png)
- **Favicon**: Added favicon support using the same logo
  - Place your logo at `/public/images/logo.png` for favicon
  - Falls back to the same online icon if local file is not found

### 2. Home Background Enhancement
- **Dual Background Support**: The home section now supports both video AND image backgrounds
- **Video Background**: `/public/videos/background.mp4` (place your video here)
- **Image Background**: `/public/images/background.jpg` (place your image here)
- **Smart Fallback**: If video doesn't load or fails, the image will automatically display
- **How it Works**:
  - Video tries to load first
  - If video is present and loads successfully, it displays
  - If video is missing or fails to load, image fallback is shown
  - Both files can coexist in the folders

### 3. Join Us Section Redesign
- **Form Only**: The contact section now displays only the membership form
- **Centered Layout**: Form is centered and takes full width (max 800px)
- **Contact Information**: Moved to footer (see below)

### 4. Footer Enhancement
- **Contact Information Added**: All contact details now appear in footer:
  - Address: 123 Charity Street, Srinagar, J&K, India
  - Phone: +91 1234567890
  - Email: info@chinarcharity.org
  - Office Hours: Mon - Sat: 9:00 AM - 6:00 PM
- **Social Media Links**: Social media icons moved to footer
  - Facebook, Twitter, Instagram, LinkedIn
- **Footer Sections**: 
  - Organization info
  - Quick links
  - Get involved
  - Contact & Social media

## How to Add Your Files

### Adding Your Logo
1. Place your logo file at: `/public/images/logo.png`
2. Recommended size: 96x96 pixels or higher (transparent PNG works best)
3. The logo will automatically appear in:
   - Navbar (displayed at 50px height)
   - Favicon (browser tab icon)
4. If logo file is not found, it will use the online fallback icon

### Adding Background Video
1. Place your video file at: `/public/videos/background.mp4`
2. Recommended specifications:
   - Format: MP4
   - Resolution: 1920x1080 or higher
   - Duration: 10-30 seconds (looping)
   - Optimized for web (compressed)

### Adding Background Image
1. Place your image file at: `/public/images/background.jpg`
2. Recommended specifications:
   - Format: JPG or PNG
   - Resolution: 1920x1080 or higher
   - Optimized for web (compressed to ~500KB)

### Priority Order
1. Video will try to load first
2. If video fails or doesn't exist, image will display
3. Both can exist in folders - smart fallback handles this automatically

## Installation & Running

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup
1. Extract the zip file
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Add your media files:
   - Logo: `/public/images/logo.png`
   - Background image: `/public/images/background.jpg`
   - Background video: `/public/videos/background.mp4`

5. Configure environment variables (optional):
   - Copy `.env.example` to `.env`
   - Update values as needed

6. Start the server:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

7. Open your browser and visit: `http://localhost:3000`

## File Structure
```
chinar-ngo-website/
├── public/
│   ├── css/
│   │   └── style.css (updated with logo & background styles)
│   ├── images/
│   │   ├── logo.png (ADD YOUR LOGO HERE)
│   │   └── background.jpg (ADD YOUR IMAGE HERE)
│   ├── js/
│   │   └── main.js (updated with video/image fallback logic)
│   └── videos/
│       └── background.mp4 (ADD YOUR VIDEO HERE)
├── views/
│   ├── partials/
│   │   ├── navbar.ejs (updated - logo instead of text)
│   │   ├── home.ejs (updated - video/image support)
│   │   ├── contact.ejs (updated - form only)
│   │   └── footer.ejs (updated - contact info & social)
│   └── index.ejs (updated - favicon support)
├── routes/
├── server.js
├── package.json
└── README.md (this file)
```

## Features Retained
- Responsive design (mobile, tablet, desktop)
- Smooth scrolling navigation
- Animated counters in Impact section
- Form validation
- Hamburger menu for mobile
- All original sections (Mission, Projects, Impact, Stories, About)

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes
- All contact information and social links in footer can be updated in `/views/partials/footer.ejs`
- Logo fallback uses Icons8 charity icon (free with attribution)
- Video autoplay works on most browsers (muted by default for autoplay policy compliance)
- Image fallback ensures users always see a background even if video fails

## Support
For questions or issues, please contact the development team.

---
© 2026 Chinar Charity Foundation. All rights reserved.
