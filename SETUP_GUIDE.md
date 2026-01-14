# 🚀 Quick Setup Guide - Chinar Charity Foundation Website

## ⏱️ 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your preferred text editor
# nano .env
# or
# vim .env
# or just open it in your code editor
```

### Step 3: Start the Server
```bash
npm start
```

Visit: http://localhost:3000

**That's it! The website is now running! ✅**

---

## 🎨 Customizing Your Logo

### Option 1: Use Your Own Logo (Recommended)
1. Prepare your logo as a PNG file (recommended: 512x512px with transparency)
2. Replace `public/images/logo.png` with your logo
3. Regenerate favicon:
   ```bash
   python3 create-logo.py
   ```
4. Refresh your browser

### Option 2: Use the Default Placeholder
- A green charity logo with heart symbol is already created
- You can keep it or replace it later

---

## 📧 Email Configuration (Optional)

The website works WITHOUT email setup! Form submissions are logged to console.

### To Enable Email Notifications:

#### Gmail Setup (Most Common):
1. Enable 2-Factor Authentication: https://myaccount.google.com/security
2. Create App Password: https://myaccount.google.com/apppasswords
3. Update your `.env` file:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=youremail@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  # Your 16-character app password
   RECIPIENT_EMAIL=where-to-receive@gmail.com
   ```
4. Restart the server: `npm start`

#### Other Email Providers:

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=youremail@outlook.com
SMTP_PASS=your-password
```

**Yahoo Mail:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=youremail@yahoo.com
SMTP_PASS=your-app-password
```

---

## 🧪 Testing the Form

### Without Email (Default):
1. Fill out the form on http://localhost:3000
2. Click "Submit Application"
3. Check your terminal/console - you'll see the submission data logged with emojis:
   ```
   📝 NEW MEMBER REGISTRATION:
   ============================
   Name: John Doe
   Email: john@example.com
   ...
   ```

### With Email Configured:
1. Fill out the form
2. Click "Submit Application"
3. Check the console for:
   ```
   ✅ Email sent successfully!
   Message ID: <...>
   ```
4. Check your recipient email inbox

---

## 🔍 Troubleshooting

### Form Error: ETIMEDOUT or ESOCKET
**Problem:** Cannot connect to email server

**Solutions:**
1. Check your internet connection
2. Verify SMTP settings in `.env`
3. Try a different email provider
4. **Note:** Form data is still captured in console logs!

**Console will show:**
```
❌ ERROR in form submission:
Error Code: ETIMEDOUT
📝 SUBMISSION DATA (Email failed but data captured):
[Your data is logged here]
```

### Form Error: EAUTH
**Problem:** Email authentication failed

**Solutions:**
1. **For Gmail:** Make sure you're using an App Password, not your regular password
2. Verify SMTP_USER is your full email address
3. Double-check SMTP_PASS has no extra spaces
4. Ensure 2FA is enabled on your Google account

### Logo Not Showing
**Solutions:**
1. Verify file exists: `ls -lh public/images/logo.png`
2. Check file size (should be > 0 bytes)
3. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
4. Regenerate: `python3 create-logo.py`

### Port 3000 Already in Use
**Solution:**
```bash
# Change port in .env
PORT=3001

# Or stop existing process
lsof -i :3000
kill -9 <PID>
```

---

## 📊 Understanding Console Logs

The website uses emoji-based logging for easy debugging:

| Icon | Meaning | Example |
|------|---------|---------|
| ✅ | Success | `✅ Email sent successfully!` |
| ❌ | Error | `❌ ERROR in form submission` |
| ⚠️ | Warning | `⚠️ Email not configured` |
| 📧 | Email action | `📧 Creating email transporter...` |
| 📝 | Data logged | `📝 NEW MEMBER REGISTRATION` |
| 📤 | Sending | `📤 Submitting form data...` |
| 📥 | Receiving | `📥 Response received: 200 OK` |

### Example Successful Submission:
```
=== Form Submission Started ===
Received data: {
  "name": "John Doe",
  "email": "john@example.com",
  ...
}
📧 Creating email transporter...
SMTP Host: smtp.gmail.com
✅ Transporter created, verifying connection...
✅ SMTP connection verified successfully
📤 Sending email...
✅ Email sent successfully!
Message ID: <xyz@gmail.com>
=== Form Submission Completed ===
```

### Example Failed Submission (Email not configured):
```
=== Form Submission Started ===
⚠️  Email not configured - Saving submission to console only

📝 NEW MEMBER REGISTRATION:
============================
Name: John Doe
Email: john@example.com
...
============================
```

---

## 🎯 Next Steps

1. ✅ Website is running
2. ✅ Form submissions work (logged to console)
3. 📧 Optional: Configure email for notifications
4. 🎨 Optional: Replace logo with your organization's logo
5. ✏️ Customize content in `views/partials/*.ejs` files
6. 🎨 Adjust styling in `public/css/style.css`
7. 📸 Add your organization's images to `public/images/`
8. 🎬 Add background video to `public/videos/` (optional)

---

## 📦 File Structure Overview

```
chinar-ngo-website/
├── 📄 server.js              # Main server (start here)
├── 📄 .env                   # Your configuration
├── 📁 routes/
│   └── main.js              # Form handling & email
├── 📁 views/
│   ├── index.ejs            # Main HTML template
│   └── partials/            # Page sections (edit these!)
│       ├── contact.ejs      # The form
│       ├── navbar.ejs       # Navigation
│       ├── home.ejs         # Hero section
│       └── ...
├── 📁 public/
│   ├── 📁 css/
│   │   └── style.css        # All styling
│   ├── 📁 js/
│   │   └── main.js          # Frontend JavaScript
│   ├── 📁 images/
│   │   └── logo.png         # Your logo
│   └── favicon.ico          # Browser icon
└── 📄 README.md             # Full documentation
```

---

## 🆘 Need Help?

1. **Check console logs** - They show exactly what's happening
2. **Read error messages** - They're designed to be helpful
3. **Review `.env.example`** - Has detailed configuration comments
4. **Read README.md** - Full documentation with all details

---

## 🚀 Production Deployment

When ready to deploy:

1. **Use a process manager:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name chinar-ngo
   pm2 save
   ```

2. **Set up HTTPS** (strongly recommended)
3. **Configure proper email** credentials
4. **Set `NODE_ENV=production`**
5. **Use a reverse proxy** (nginx/Apache)

---

**Enjoy your new website! 🎉**

For detailed documentation, see README.md
