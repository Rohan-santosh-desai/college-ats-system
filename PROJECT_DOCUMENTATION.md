# 🎓 CampusHire - College ATS System

## 📋 Project Overview

**CampusHire** is a comprehensive Application Tracking System (ATS) designed for colleges to manage campus recruitment. It connects three key stakeholders: **Admins**, **Students**, and **Recruiters** in a seamless placement management workflow.

**Last Updated:** February 16, 2026

---

## 🏗️ Tech Stack

### **Frontend**
- **Framework:** Next.js 16 (App Router with Turbopack)
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
│   │   ├── students/             # Student management (Approve/Reject/Recover)
│   │   ├── recruiters/           # Recruiter invite & management
│   │   ├── jobs/                 # Job listings (planned)
│   │   ├── analytics/            # Analytics dashboard (planned)
│   │   └── settings/             # Admin settings (planned)
│   ├── students/
│   │   ├── dashboard/            # Student dashboard (protected)
│   │   │   ├── profile/          # Profile view/edit
│   │   │   ├── jobs/             # Browse jobs (real data, college-filtered)
│   │   │   └── applications/     # Track applications
│   │   └── onboarding/           # Onboarding flow (outside layout)
│   │       ├── complete-profile/ # Profile completion form
│   │       └── waiting-approval/ # Waiting for approval page
│   ├── recruiters/dashboard/     # Recruiter dashboard
│   │   ├── jobs/                 # Job management (Post, View, Detail)
│   │   │   ├── create/           # Post new job form
│   │   │   └── [jobId]/          # Job detail + applicant list
│   │   ├── applications/         # Application review (mock, pending T2.6)
│   │   └── profile/              # Recruiter profile
│   └── api/                      # API routes
│       ├── admin/                # Admin APIs (students, invite-recruiter)
│       ├── students/             # Student APIs (profile CRUD)
│       ├── jobs/route.ts         # GET (fetch jobs by college) + POST (create job)
│       └── upload/route.ts       # POST (file upload: resumes)
├── components/
│   ├── jobspage/                 # Job browsing components
│   │   ├── JobsList.tsx          # Renders list of JobCard components
│   │   ├── JobCard.tsx           # Individual job card with real data
│   │   ├── JobDetailsModal.tsx   # Full job details dialog
│   │   ├── ApplyJobModal.tsx     # Apply form with resume upload
│   │   ├── JobsHeader.tsx        # Page header
│   │   └── JobsFilters.tsx       # Filter controls
│   ├── applicationspage/         # Application tracking components
│   └── dashboard/                # Dashboard stat cards
├── types/
│   ├── next-auth.d.ts            # NextAuth session type augmentation
│   └── job.ts                    # Shared Job interface (used across components)
├── lib/                          # Utilities
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client singleton
│   └── email.ts                  # Email service (Nodemailer)
├── prisma/
│   ├── schema.prisma             # Database schema (all models)
│   └── seed.ts                   # Seed data (colleges, admins, students)
└── public/
    └── uploads/resumes/          # Uploaded resume files (local storage)
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
- ✅ Browse jobs posted for their college (real data from DB)
- ✅ View full job details in modal
- ✅ Upload resume (PDF/DOCX, 5MB max)
- ⏳ Apply to jobs with resume (T2.4 — in progress)
- ⏳ Track application status (T2.5 — planned)
- ✅ Update profile (name, roll number)

#### **Recruiter**
- ✅ Sign up via invite link
- ✅ Post job openings (title, description, location, salary, type, requirements)
- ✅ View all posted jobs (real data)
- ✅ View job detail with applicant list
- ⏳ Review and manage applications (T2.6 — planned)
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

### **Recruiter Job Posting Flow**

```
1. Recruiter Logs In
   ↓
2. Navigate to Jobs → Click "Post New Job"
   ↓
3. Fill Job Form:
   - Title, Description, Location, Salary
   - Job Type (Full-time / Part-time / Internship / Contract)
   - Requirements (skills, qualifications)
   ↓
4. Submit → POST /api/jobs
   ↓
5. Job Created in DB (status: ACTIVE, linked to college)
   ↓
6. Job Appears in:
   - Recruiter's "My Jobs" list ✅
   - Students' Job Browse page (same college only) ✅
```

### **Student Job Browsing & Application Flow**

```
1. Student Logs In (must be APPROVED)
   ↓
2. Navigate to Jobs Page
   ↓
3. System Fetches Jobs:
   - Server-side Prisma query
   - Filtered by student's collegeId
   - Only ACTIVE jobs shown
   - Includes recruiter company name & applicant count
   ↓
4. Student Sees Job Cards:
   - Title, Company, Location, Salary, Job Type
   - "Posted X ago" (relative time via date-fns)
   - Applicant count
   ↓
5. Click "View Details" → Job Details Modal:
   - Full description, all metadata
   - "Apply Now" button
   ↓
6. Click "Apply Now" → Apply Modal:
   - Upload Resume (PDF/DOCX, max 5MB)
   - Optional Cover Letter
   - Submit → Uploads file to /api/upload
   ↓
7. (T2.4 - Coming Next) Application record saved to DB
```

### **File Upload Flow (Technical Detail)**

```
1. Student Selects File in Apply Modal
   ↓
2. Client-Side Validation:
   - File type: PDF, DOC, or DOCX only
   - Displayed with filename, size, remove option
   ↓
3. On Submit → FormData sent to POST /api/upload:
   - Server validates: file type, file size (≤ 5MB)
   - Generates unique filename: UUID + sanitized original name
   - Creates directory: public/uploads/resumes/ (if not exists)
   - Writes file to disk using Node.js fs/promises
   ↓
4. Returns JSON: { success: true, url: "/uploads/resumes/uuid-filename.pdf" }
   ↓
5. URL stored for use in application submission (T2.4)
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
POST /api/admin/invite-recruiter      # Generate invite link + send email
```

### **Student APIs**

#### **Profile Management**
```
GET  /api/students/profile            # Fetch profile
POST /api/students/profile            # Create/complete profile
PUT  /api/students/profile            # Update profile (approved only)
GET  /api/students/profile/status     # Check profile & approval status
```

### **Job APIs**

#### **Job Management**
```
GET  /api/jobs                        # Fetch ACTIVE jobs for user's college
                                      # Includes: recruiter.companyName, _count.applications
                                      # Ordered by: createdAt DESC
POST /api/jobs                        # Create new job (recruiter only)
                                      # Required: title, description, location, salary, jobType, requirements
                                      # Auto-links: recruiterId, collegeId from session
```

### **File Upload API**

```
POST /api/upload                      # Upload file (authenticated users)
                                      # Body: FormData { file, type: 'resume' }
                                      # Validates: PDF/DOC/DOCX, max 5MB
                                      # Returns: { success: true, url: '/uploads/resumes/uuid-filename.pdf' }
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

#### **Scenario D: Recruiter Posts a Job**
1. **Login as Recruiter:**
   - Use a recruiter account (create one via admin invite if none exists).
2. **Navigate:** Go to **Jobs** → Click **"Post New Job"**.
3. **Action:**
   - Fill out the form:
     - **Title:** "Frontend Developer Intern"
     - **Description:** "We are looking for a React developer..."
     - **Location:** "Bangalore, India"
     - **Salary:** "₹25,000/month"
     - **Job Type:** Select "Internship"
     - **Requirements:** "React, JavaScript, CSS, HTML"
   - Click **"Post Job"**.
4. **Verification:**
   - ✅ Redirects to My Jobs page.
   - ✅ New job appears in the jobs list.
   - ✅ Check Prisma Studio → `Job` table → new record with `status: ACTIVE`.
   - ✅ `recruiterId` and `collegeId` are auto-filled from session.

#### **Scenario E: Student Browses Jobs & Uploads Resume**
1. **Login as Student:**
   - Email: `rahul.sharma@demo.com`
   - Password: `student123`
2. **Navigate:** Go to **Jobs** (Sidebar).
3. **Verification (Job Listing):**
   - ✅ Page shows jobs posted for the student's college only.
   - ✅ Each job card shows: title, company, location, salary, job type, posted time ago, applicant count.
   - ✅ "Showing X jobs" count matches actual number.
   - ✅ If no jobs exist, shows "No jobs available at the moment."
4. **Action (View Details):**
   - Click **"View Details"** on any job card.
   - ✅ Modal opens with full job description, location, salary, job type, posted date.
5. **Action (Apply):**
   - Click **"Apply Now"** in the modal.
   - ✅ Apply modal opens.
   - Upload a PDF file (< 5MB).
   - ✅ File name and size are displayed.
   - Click **"Submit Application"**.
   - ✅ File is uploaded to `public/uploads/resumes/` on the server.
   - ✅ Console shows: `Resume uploaded: /uploads/resumes/uuid-filename.pdf`

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
- ✅ Email notifications on approval/rejection
- ✅ Dashboard homepage (mock stats/charts)

#### **Student Dashboard**
- ✅ Profile completion flow (outside layout)
- ✅ Waiting for approval page (auto-refresh every 10s)
- ✅ Access control (blocks unapproved students)
- ✅ Profile view/edit page (name, roll number editable)
- ✅ Fixed sidebar layout
- ✅ **Browse jobs page (real data from DB, college-filtered)**
- ✅ **Job details modal (full description, metadata, Apply button)**
- ✅ **Resume upload in Apply modal (PDF/DOCX, 5MB max)**

#### **Recruiter Dashboard**
- ✅ Invite-based signup
- ✅ Fixed sidebar layout
- ✅ Dashboard homepage (mock stats)
- ✅ **Post Job form (title, description, location, salary, type, requirements)**
- ✅ **My Jobs list (real data from DB)**
- ✅ **Job Detail page with applicant list**

#### **Email System**
- ✅ Nodemailer integration
- ✅ Gmail SMTP setup
- ✅ Approval email template (HTML + plain text)
- ✅ Rejection email template (HTML + plain text)
- ✅ Recruiter invite email template

#### **Database**
- ✅ Multi-tenant schema (college-isolated data)
- ✅ User roles and status enums
- ✅ Job model with recruiter + college relations
- ✅ Application model with student + job relations
- ✅ Profile storage (Student + Recruiter)
- ✅ Seed data

#### **File Upload System**
- ✅ `POST /api/upload` endpoint
- ✅ File type validation (PDF, DOC, DOCX)
- ✅ File size validation (max 5MB)
- ✅ Unique filename generation (UUID)
- ✅ Local storage in `public/uploads/resumes/`
- ✅ Returns accessible URL for stored files

#### **Shared Types & Architecture**
- ✅ Shared `Job` interface (`types/job.ts`)
- ✅ NextAuth session type augmentation (`types/next-auth.d.ts`)
- ✅ Prisma client singleton pattern (`lib/prisma.ts`)

### 🚧 **In Progress / Planned**

#### **Student Dashboard**
- 🟡 Apply to jobs (upload works, application API pending)
- ⏳ Track applications (real data)

#### **Recruiter Dashboard**
- ⏳ Review applications (real data)
- ⏳ Shortlist/reject/hire candidates
- ⏳ Company profile page

#### **Admin Dashboard**
- ⏳ Approved/All students tabs
- ⏳ Job management page
- ⏳ Analytics with real data

#### **ATS Engine**
- ⏳ Basic keyword match scoring
- ⏳ Python/FastAPI microservice (NLP-based)
- ⏳ AI-powered resume analysis

#### **General**
- ⏳ Dynamic sidebar user info (currently hardcoded)
- ⏳ Proper logout (currently `console.log`)
- ⏳ Search and filter functionality
- ⏳ Real-time notifications
- ⏳ Dashboard stats with real data

---

## 🐛 Known Issues & Limitations

### **Current Limitations**
1. **Email:** Currently using Gmail (500 emails/day limit)
2. **File Upload:** Local storage only (files lost on redeployment; fine for local/VPS hosting)
3. **Search:** Basic search only, no advanced filters
4. **Mobile:** Sidebar hidden on mobile (no hamburger menu yet)
5. **Dashboard Stats:** Admin, Student, and Recruiter dashboards show mock/hardcoded numbers
6. **Sidebar User Info:** All 3 sidebars show hardcoded names instead of session data
7. **Logout:** Uses `console.log` instead of `signOut()`

### **Planned Improvements**
1. Add hamburger menu for mobile
2. Cloud file storage (S3/Cloudinary) for production
3. Add advanced search and filters for jobs
4. Real-time notifications with WebSockets
5. Export reports (PDF, Excel)
6. Dynamic sidebar with session data
7. Proper `signOut()` implementation

---

## 📚 Additional Documentation

- **Gmail Setup:** `GMAIL_SETUP.md`
- **Implementation Plan:** `implementation_plan.md`
- **Task Tracking (old):** `task.md`
- **Master Task Tracker:** `project_tasks.md`

---

## 🤝 Contributing

### **Code Style**
- TypeScript strict mode
- ESLint + Prettier
- Tailwind CSS for styling
- Functional components with hooks
- Server Components for data-heavy pages (jobs, applications)
- Client Components for interactive UI (modals, forms)

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
4. Review Prisma Studio (`pnpm prisma studio`) for database

---

## 📝 Changelog

### **v0.5.0** - February 16, 2026
- ✅ **Student Job Browsing (Real Data):**
  - Added `GET /api/jobs` endpoint (fetches ACTIVE jobs by college)
  - Converted student jobs page to async server component
  - `JobsList`, `JobCard` now render real database data
  - Jobs filtered by student's `collegeId` (multi-tenancy enforced)
  - Shows recruiter company name, applicant count, relative time
- ✅ **Job Details Modal (Real Data):**
  - Updated `JobDetailsModal` to display real job description
  - Added accessible `DialogTitle` + `DialogDescription` (Radix UI)
  - Displays location, salary, job type, posted date
- ✅ **File Upload Infrastructure:**
  - Created `POST /api/upload` endpoint
  - Supports PDF, DOC, DOCX (validated server-side)
  - Max file size: 5MB (validated server-side)
  - UUID-based unique filenames to prevent collisions
  - Saves to `public/uploads/resumes/` (local storage)
  - Connected `ApplyJobModal` to real upload API
- ✅ **Shared Type System:**
  - Created `types/job.ts` with shared `Job` interface
  - Used across `JobsList`, `JobCard`, `JobDetailsModal`, `JobsPage`
- ✅ Fixed Next.js 16 async `params` handling in `[jobId]/page.tsx`

### **v0.4.0** - February 16, 2026
- ✅ Recruiter: Post Job form (`/recruiters/dashboard/jobs/create`)
- ✅ Recruiter: `POST /api/jobs` endpoint (creates job in DB)
- ✅ Recruiter: My Jobs list (real data, server-side fetch)
- ✅ Recruiter: Job Detail page with applicant list
- ✅ Fixed `params.jobId` undefined error (Next.js 16 async params)

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

## 🏗️ Implementation Details (For Project Report)

### **Server Components vs Client Components**

This project uses Next.js App Router which supports React Server Components (RSC):

| Component Type | Usage | Example |
|----------------|-------|---------|
| **Server Component** | Pages that fetch data directly from DB | `jobs/page.tsx` (uses Prisma directly) |
| **Client Component** | Interactive UI with `useState`, `onClick` | `JobCard.tsx`, `ApplyJobModal.tsx` |

**Why Server Components?**
- Direct database access without API calls (faster)
- No client-side JavaScript bundle for data fetching
- Better security (DB credentials never sent to browser)

### **Multi-Tenancy Implementation**

Every data query is filtered by `collegeId`:

```typescript
// Student sees ONLY jobs from their college
const jobs = await prisma.job.findMany({
  where: {
    collegeId: session.user.collegeId,  // From JWT session
    status: "ACTIVE",
  },
});
```

This ensures **complete data isolation** between colleges.

### **File Upload Architecture**

```
Client (Browser)          Server (Next.js API)         File System
──────────────────      ────────────────────      ──────────────
1. User selects   ───→  2. Validate type     ───→  4. Save file
   PDF file             3. Validate size (<5MB)      /public/uploads/
                        4. Generate UUID name       resumes/uuid-name.pdf
                    ───→  5. Return URL   ───→  Available at:
                           /uploads/resumes/...      localhost:3000/uploads/...
```

### **Database Relations (Simplified)**

```
College (1) ────┬──── (*) User
             │          │
             │          ├── StudentProfile (1:1)
             │          └── RecruiterProfile (1:1)
             │
             └──── (*) Job ────┬── recruiter (RecruiterProfile)
                           │
                           └── (*) Application
                                  ├── student (User)
                                  ├── resumeUrl
                                  ├── matchScore
                                  └── status (APPLIED/SHORTLISTED/REJECTED/HIRED)
```

---

**Last Updated:** February 16, 2026  
**Version:** 0.5.0  
**Status:** Active Development 🚀
