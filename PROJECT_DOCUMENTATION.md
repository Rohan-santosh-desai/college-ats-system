# 🎓 CampusHire - College ATS System

## 📋 Project Overview

**CampusHire** is a comprehensive Application Tracking System (ATS) designed for colleges to manage campus recruitment. It connects three key stakeholders: **Admins**, **Students**, and **Recruiters** in a seamless placement management workflow.

**Last Updated:** February 13, 2026

---

## 🏗️ Tech Stack

### **Frontend**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React

### **Backend**
- **Framework:** Next.js API Routes
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js
- **Email:** Nodemailer (Gmail SMTP)

### **Deployment**
- **Hosting:** Vercel (recommended)
- **Database:** Neon/Supabase/Railway PostgreSQL

---

## 📁 Project Structure

```
college-ats-system/
├── app/
│   ├── admin/dashboard/          # Admin dashboard & features
│   │   ├── students/             # Student management
│   │   ├── recruiters/           # Recruiter management
│   │   ├── jobs/                 # Job listings
│   │   ├── analytics/            # Analytics dashboard
│   │   └── settings/             # Admin settings
│   ├── students/
│   │   ├── dashboard/            # Student dashboard (protected)
│   │   │   ├── profile/          # Profile view/edit
│   │   │   ├── jobs/             # Browse jobs
│   │   │   └── applications/     # Track applications
│   │   └── onboarding/           # Onboarding flow (outside layout)
│   │       ├── complete-profile/ # Profile completion form
│   │       └── waiting-approval/ # Waiting for approval page
│   ├── recruiters/dashboard/     # Recruiter dashboard
│   │   ├── jobs/                 # Job management
│   │   ├── applications/         # Application review
│   │   └── profile/              # Recruiter profile
│   └── api/                      # API routes
│       ├── admin/                # Admin APIs
│       ├── students/             # Student APIs
│       └── recruiters/           # Recruiter APIs
├── components/                   # Reusable components
├── lib/                          # Utilities
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client
│   └── email.ts                  # Email service (Nodemailer)
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed data
└── public/                       # Static assets
```

---

## 🎯 Core Features

### **1. Multi-Tenant Architecture**
- ✅ Each college is isolated (College-based multi-tenancy)
- ✅ College registration codes for student signup
- ✅ Data segregation by `collegeId`

### **2. Role-Based Access Control (RBAC)**
Three user roles with distinct permissions:

#### **Admin**
- ✅ Approve/reject student registrations
- ✅ Invite recruiters via email
- ✅ Manage jobs and applications
- ✅ View analytics and reports
- ✅ Configure college settings

#### **Student**
- ✅ Complete profile after signup
- ✅ Wait for admin approval
- ✅ Browse and apply to jobs (after approval)
- ✅ Track application status
- ✅ Update profile (name, roll number)

#### **Recruiter**
- ✅ Sign up via invite link
- ✅ Post job openings
- ✅ Review student applications
- ✅ Shortlist/reject candidates
- ✅ Manage company profile

---

## 🔄 User Workflows

### **Student Onboarding Flow**

```
1. Student Signs Up
   ↓
2. Enter College Code
   ↓
3. Account Created (Status: PENDING)
   ↓
4. Redirect to Profile Completion (Fullscreen, no sidebar)
   ↓
5. Fill Profile Details (Name, Roll Number, Branch, Year)
   ↓
6. Submit Profile
   ↓
7. Redirect to Waiting Approval Page (Fullscreen, auto-refresh)
   ↓
8. Admin Reviews & Approves
   ↓
9. Student Receives Approval Email 📧
   ↓
10. Auto-redirect to Dashboard (Full Access) ✅
```

**Key Features:**
- ✅ Onboarding pages are **outside dashboard layout** (fullscreen, no sidebar)
- ✅ Dashboard is **blocked** until approved
- ✅ Waiting page **auto-refreshes** every 10 seconds
- ✅ Profile data stored in both `User` and `StudentProfile` tables

### **Admin Student Management Flow**

```
1. Admin Logs In
   ↓
2. Go to Students Page
   ↓
3. View Tabs:
   - Pending (Students waiting approval)
   - Rejected (Rejected students with Recover option)
   - Approved (Coming soon)
   - All (Coming soon)
   ↓
4. Actions:
   - Approve → Student gets email, status = APPROVED
   - Reject → Student status = REJECTED
   - Recover → Change REJECTED back to APPROVED
```

### **Recruiter Invitation Flow**

```
1. Admin Goes to Recruiters Page
   ↓
2. Fill Invite Form (Email, Company Name)
   ↓
3. Click "Send Invite & Generate Link"
   ↓
4. System Sends Email 📧 + Displays Link
   ↓
5. Copy Link (Backup) OR Recruiter Clicks Email Link
   ↓
6. Recruiter Signs Up via Link (Auto-approved)
   ↓
7. Recruiter Gets Dashboard Access ✅
```

---

## 🗄️ Database Schema

### **Key Models**

#### **User**
```prisma
model User {
  id            String      @id @default(cuid())
  name          String?     // Full name (updated from profile)
  email         String?     @unique
  password      String?
  role          UserRole    @default(STUDENT)
  status        UserStatus  @default(PENDING)
  collegeId     String
  college       College     @relation(fields: [collegeId], references: [id])
  
  studentProfile   StudentProfile?
  recruiterProfile RecruiterProfile?
}
```

#### **StudentProfile**
```prisma
model StudentProfile {
  id               String   @id @default(cuid())
  userId           String   @unique
  firstName        String   // Editable
  lastName         String   // Editable
  rollNumber       String   // Editable
  branch           String   // Read-only after creation
  graduationYear   Int      // Read-only after creation
  profileCompleted Boolean  @default(false)
  
  user User @relation(fields: [userId], references: [id])
}
```

#### **College**
```prisma
model College {
  id             String   @id @default(cuid())
  name           String
  code           String   @unique  // Registration code for students
  adminEmail     String
  
  users          User[]
  jobs           Job[]
  invites        RecruiterInvite[]
}
```

#### **Enums**
```prisma
enum UserRole {
  ADMIN
  STUDENT
  RECRUITER
}

enum UserStatus {
  PENDING    // Waiting for approval
  APPROVED   // Approved by admin
  REJECTED   // Rejected by admin
}

enum ApplicationStatus {
  APPLIED
  SHORTLISTED
  REJECTED
  HIRED
}
```

---

## 🔐 Authentication & Authorization

### **NextAuth.js Configuration**

**File:** `lib/auth.ts`

**Features:**
- ✅ Credentials provider (email + password)
- ✅ Session-based authentication
- ✅ Role stored in session
- ✅ College ID stored in session

**Session Structure:**
```typescript
{
  user: {
    id: "user123",
    email: "student@university.edu",
    name: "John Doe",
    role: "STUDENT",
    collegeId: "college456",
    status: "APPROVED"
  }
}
```

### **Route Protection**

#### **Layout-Level Protection**
Each dashboard layout checks user status:

**Student Layout:** `app/students/dashboard/layout.tsx`
```typescript
// Checks on mount:
1. Profile completed? → If no, redirect to /onboarding/complete-profile
2. Status APPROVED? → If no, redirect to /onboarding/waiting-approval
3. If both OK → Show dashboard ✅
```

**Admin Layout:** `app/admin/dashboard/layout.tsx`
```typescript
// Checks role = ADMIN
// Fixed sidebar, logout always visible
```

**Recruiter Layout:** `app/recruiters/dashboard/layout.tsx`
```typescript
// Checks role = RECRUITER
// Fixed sidebar, logout always visible
```

#### **API-Level Protection**
Every API route checks:
```typescript
const session = await getServerSession(authOptions);

if (!session || session.user.role !== "ADMIN") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

---

## 📧 Email Notifications

### **Setup**
**Service:** Nodemailer + Gmail SMTP

**Configuration:** `.env`
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NEXTAUTH_URL=http://localhost:3000
```

**Setup Guide:** See `GMAIL_SETUP.md`

### **Email Templates**

#### **1. Student Approval Email**
- **Trigger:** Admin approves student
- **Recipient:** Student
- **Subject:** 🎉 Your CampusHire Account Has Been Approved!
- **Content:** Welcome message, dashboard link, feature list

#### **2. Student Rejection Email**
- **Trigger:** Admin rejects student
- **Recipient:** Student
- **Subject:** Update on Your CampusHire Application
- **Content:** Rejection notice, contact admin info

#### **3. New Student Notification** (Optional)
- **Trigger:** Student completes profile
- **Recipient:** Admin
- **Subject:** 🔔 New Student Profile Awaiting Approval
- **Content:** Student details, review link

---

## 🎨 UI/UX Features

### **Fixed Sidebar Layout**
All dashboards now have:
- ✅ **Fixed sidebar** (doesn't scroll)
- ✅ **Logout always visible** at bottom
- ✅ **Only main content scrolls**
- ✅ Proper spacing with `ml-64` margin

### **Responsive Design**
- ✅ Mobile-friendly layouts
- ✅ Hidden sidebar on mobile (can add hamburger menu)
- ✅ Responsive grids and cards

### **Loading States**
- ✅ Skeleton loaders
- ✅ Spinner animations
- ✅ Disabled buttons during actions

### **Status Badges**
```typescript
PENDING   → Yellow badge
APPROVED  → Green badge
REJECTED  → Red badge
```

---

## 🔧 API Endpoints

### **Admin APIs**

#### **Student Management**
```
GET  /api/admin/students/pending      # Fetch pending students
GET  /api/admin/students/rejected     # Fetch rejected students
POST /api/admin/students/approve/[id] # Approve student
POST /api/admin/students/reject/[id]  # Reject student
```

#### **Recruiter Management**
```
POST /api/admin/invite-recruiter      # Generate invite link
```

### **Student APIs**

#### **Profile Management**
```
GET  /api/students/profile            # Fetch profile
POST /api/students/profile            # Create/complete profile
PUT  /api/students/profile            # Update profile (approved only)
GET  /api/students/profile/status     # Check profile & approval status
```

### **Common Patterns**

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "status": 400
}
```

---

## 🚀 Setup & Installation

### **Prerequisites**
- Node.js 18+
- PostgreSQL database
- pnpm (or npm/yarn)

### **Installation Steps**

```bash
# 1. Clone repository
git clone <repo-url>
cd college-ats-system

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 4. Set up database
pnpm prisma generate
pnpm prisma db push

# 5. Seed database (optional)
pnpm prisma db seed

# 6. Run development server
pnpm dev
```

### **Environment Variables**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/campushire"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email (Nodemailer + Gmail)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-gmail-app-password"
```

---

## 🧪 Validation & Testing Guide

Follow these steps to verify the entire system, including the new **Email Notifications** and **Seed Data**.

### **Step 1: Reset & Seed Database**
First, ensure your database has the latest test data.
```bash
# 1. Stop the server (Ctrl + C) if running
# 2. Reset and Seed Database
pnpm prisma migrate reset --force
pnpm prisma db push
pnpm prisma db seed
```

### **Step 2: Start Server**
```bash
pnpm dev
```
> **Note:** Ensure your `.env` has valid `EMAIL_USER` and `EMAIL_PASSWORD` for emails to work.

---

### **Step 3: Test Workflows**

#### **Scenario A: Admin Approves Student (Email Test)**
1. **Login as Admin:**
   - Email: `admin@demo.com`
   - Password: `admin123`
2. **Navigate:** Go to **Students** tab.
3. **Action:**
   - Find student **"Priya Patel"** (Status: **Pending**).
   - Click **"Approve"**.
4. **Verification:**
   - ✅ UI should change tag to **Approved**.
   - ✅ **Check Terminal:** You should see:
     ```
     ✅ Approval email sent successfully to: priya.patel@demo.com
     ```
   - ✅ **Check Inbox:** If you used a real email in `.env`, the email should arrive.

#### **Scenario B: Invite Recruiter (Email Test)**
1. **Login as Admin** (if not already).
2. **Navigate:** Go to **Recruiters** tab.
3. **Action:**
   - Enter your personal/secondary email in the invite form.
   - Enter Company Name: "Google".
   - Click **"Send Invite"**.
4. **Verification:**
   - ✅ Toast message: "Invite sent successfully".
   - ✅ **Check Terminal:**
     ```
     ✅ Recruiter invite email sent successfully to: [your-email]
     ```
   - ✅ **Check Inbox:** Click the link in the email to test the signup flow.

#### **Scenario C: Student Profile Edit**
1. **Login as Student:**
   - Email: `rahul.sharma@demo.com` (Already Approved)
   - Password: `student123`
2. **Navigate:** Go to **Profile** (Sidebar).
3. **Action:**
   - Click **Edit Profile**.
   - Change "Rahul" to "Rahul Updated".
   - Click **Save**.
4. **Verification:**
   - ✅ UI updates immediately.
   - ✅ Database `User` and `StudentProfile` tables are updated.

---

### **Step 4: Troubleshooting**

| Issue | Solution |
|-------|----------|
| **Email error in terminal** | Check `.env` password. Must be 16-char App Password (no spaces). |
| **"User not found" on login** | Run `pnpm prisma db seed` again. |
| **Database error** | Run `pnpm prisma db push` to sync schema. |
| **Changes not showing** | Restart server (`Ctrl + C` -> `pnpm dev`). |

---

## 📊 Features Status

### ✅ **Completed Features**

#### **Admin Dashboard**
- ✅ Student approval workflow (Pending, Rejected tabs)
- ✅ Approve/Reject/Recover actions
- ✅ Recruiter invitation system
- ✅ Fixed sidebar layout
- ✅ Email notifications on approval

#### **Student Dashboard**
- ✅ Profile completion flow (outside layout)
- ✅ Waiting for approval page (auto-refresh)
- ✅ Access control (blocks unapproved students)
- ✅ Profile view/edit page
- ✅ Editable fields: name, roll number
- ✅ Fixed sidebar layout

#### **Recruiter Dashboard**
- ✅ Invite-based signup
- ✅ Fixed sidebar layout
- ✅ Basic dashboard structure

#### **Email System**
- ✅ Nodemailer integration
- ✅ Gmail SMTP setup
- ✅ Approval email template
- ✅ Rejection email template
- ✅ HTML + plain text versions

#### **Database**
- ✅ Multi-tenant schema
- ✅ User roles and status
- ✅ Profile storage
- ✅ Seed data

### 🚧 **In Progress / Planned**

#### **Admin Dashboard**
- ⏳ Approved students tab
- ⏳ All students tab
- ⏳ Recruiter management (view, suspend)
- ⏳ Job management
- ⏳ Analytics dashboard

#### **Student Dashboard**
- ⏳ Browse jobs
- ⏳ Apply to jobs
- ⏳ Track applications
- ⏳ Resume upload

#### **Recruiter Dashboard**
- ⏳ Post jobs
- ⏳ Review applications
- ⏳ Shortlist/reject candidates
- ⏳ Company profile

#### **General**
- ⏳ Search functionality
- ⏳ Filters and sorting
- ⏳ Real-time notifications
- ⏳ File uploads (resumes, company logos)
- ⏳ Advanced analytics

---

## 🐛 Known Issues & Limitations

### **Current Limitations**
1. **Email:** Currently using Gmail (500 emails/day limit)
2. **File Upload:** Not yet implemented
3. **Search:** Basic search only, no advanced filters
4. **Mobile:** Sidebar hidden on mobile (no hamburger menu yet)

### **Planned Improvements**
1. Add hamburger menu for mobile
2. Implement file upload for resumes
3. Add advanced search and filters
4. Real-time notifications with WebSockets
5. Export reports (PDF, Excel)

---

## 📚 Additional Documentation

- **Gmail Setup:** `GMAIL_SETUP.md`
- **Implementation Plan:** `implementation_plan.md`
- **Task Tracking:** `task.md`

---

## 🤝 Contributing

### **Code Style**
- TypeScript strict mode
- ESLint + Prettier
- Tailwind CSS for styling
- Functional components with hooks

### **Commit Convention**
```
feat: Add student approval workflow
fix: Fix sidebar scroll issue
docs: Update setup guide
refactor: Improve email templates
```

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review `GMAIL_SETUP.md` for email issues
3. Check console/terminal for error logs
4. Review Prisma Studio for database issues

---

## 📝 Changelog

### **v0.3.0** - February 13, 2026
- ✅ Added email notifications (Nodemailer + Gmail)
- ✅ Created student profile view/edit page
- ✅ Fixed profile data storage (User + StudentProfile)
- ✅ Added PUT endpoint for profile updates
- ✅ Created comprehensive documentation

### **v0.2.0** - February 13, 2026
- ✅ Fixed student onboarding flow
- ✅ Moved onboarding pages outside layout
- ✅ Added access control to dashboard
- ✅ Fixed sidebar layout (fixed, no scroll)
- ✅ Moved invite recruiter to recruiters page

### **v0.1.0** - February 10, 2026
- ✅ Initial project setup
- ✅ Database schema design
- ✅ Basic authentication
- ✅ Admin student management
- ✅ Student approval workflow

---

**Last Updated:** February 13, 2026  
**Version:** 0.3.0  
**Status:** Active Development 🚀
