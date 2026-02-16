# 📧 Gmail Setup Guide for Nodemailer

## Step 1: Enable 2-Factor Authentication on Gmail

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** (left sidebar)
3. Scroll to **"How you sign in to Google"**
4. Click on **"2-Step Verification"**
5. Follow the steps to enable it (you'll need your phone)

---

## Step 2: Generate App Password

1. After enabling 2FA, go back to **Security**
2. Scroll to **"How you sign in to Google"**
3. Click on **"App passwords"**
   - If you don't see this option, make sure 2FA is enabled
4. Click **"Select app"** → Choose **"Mail"**
5. Click **"Select device"** → Choose **"Other (Custom name)"**
6. Type: **"CampusHire"**
7. Click **"Generate"**
8. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)
   - ⚠️ **IMPORTANT:** Save this password! You won't see it again.

---

## Step 3: Add to .env File

Open your `.env` file and add these lines:

```env
# Email Configuration (Gmail + Nodemailer)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop

# App URL (for email links)
NEXTAUTH_URL=http://localhost:3000
```

**Replace:**
- `your-email@gmail.com` → Your actual Gmail address
- `abcd efgh ijkl mnop` → The 16-character App Password you generated

---

## Step 4: Restart Your Dev Server

After adding to `.env`, restart your development server:

```bash
# Stop the current server (Ctrl + C)
# Then restart:
pnpm dev
```

---

## Step 5: Test Email Sending

1. **Login as Admin**
2. **Go to Students page**
3. **Approve a student**
4. **Check your terminal** - You should see:
   ```
   ✅ Approval email sent successfully to: student@email.com
   ```
5. **Check the student's email inbox** - They should receive the approval email!

---

## 🔒 Security Notes

1. **Never commit .env to Git**
   - Already in `.gitignore` ✅
   
2. **Use App Password, NOT your Gmail password**
   - App passwords are safer
   - Can be revoked anytime
   
3. **Gmail Limits:**
   - Free Gmail: **500 emails/day**
   - Google Workspace: **2000 emails/day**

---

## 🐛 Troubleshooting

### Error: "Invalid login"
- ✅ Make sure you're using **App Password**, not your Gmail password
- ✅ Remove spaces from the App Password in `.env`
- ✅ Enable 2-Factor Authentication first

### Error: "Less secure app access"
- ✅ This is old - use **App Password** instead
- ✅ Make sure 2FA is enabled

### Email not received
- ✅ Check spam/junk folder
- ✅ Check terminal for error messages
- ✅ Verify EMAIL_USER is correct in `.env`

### Error: "self signed certificate"
- Add to transporter config in `lib/email.ts`:
  ```typescript
  tls: {
    rejectUnauthorized: false
  }
  ```

---

## 📧 Example .env File

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (Gmail + Nodemailer)
EMAIL_USER="campushire.demo@gmail.com"
EMAIL_PASSWORD="abcd efgh ijkl mnop"
```

---

## ✅ You're Done!

Once configured, emails will be sent automatically when:
- ✅ Admin approves a student → Student receives approval email
- ✅ Admin rejects a student → Student receives rejection email
- ✅ Student completes profile → Admin receives notification (optional)

---

## 🚀 Production Deployment

For production (Vercel, etc.), add the same environment variables in your hosting platform's settings:
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `NEXTAUTH_URL` (your production URL)
