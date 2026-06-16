
# 🎓 CampusHire — Master Task Tracker

> **Last Updated:** February 18, 2026 (7:30 PM IST)
> **Current Phase:** Phase 2 — Job Board & Applications
> **Current Task:** T2.5 — Student Applications Tracking Page (Real Data)

---

## 📊 Project Health Summary

| Area | Status | Notes |
|------|--------|-------|
| Auth & RBAC | ✅ Complete | Login, Signup, Role-based access |
| College Multi-tenancy | ✅ Complete | College code verification |
| Student Onboarding | ✅ Complete | Profile → Waiting → Approval → Dashboard |
| Admin: Student Mgmt | ✅ Complete | Approve/Reject/Recover + Email notifications |
| Admin: Recruiter Invites | ✅ Complete | Email invite + link signup |
| Recruiter: Post Job | ✅ Complete | Form + API + DB |
| Recruiter: My Jobs List | ✅ Complete | Server-side fetch, real data |
| Recruiter: Job Detail Page | ✅ Complete | Shows applicants (empty for now) |
| Student: Browse Jobs | ✅ Complete | Real DB data, college-filtered, with details modal |
| Student: Apply to Job | ✅ Complete | Application API functional, checks duplicates |
| File Upload (Resumes) | ✅ Complete | Local storage, PDF/DOCX, 5MB limit |
| Recruiter: Manage Applications | 🔴 Not Started | UI exists (mock data), not connected |
| ATS Resume Parsing | 🔴 Not Started | No implementation |

---

## ✅ COMPLETED TASKS

### Phase 1: Core Infrastructure & Auth
- [x] **T1.1** Next.js project setup + Tailwind + Shadcn/ui
- [x] **T1.2** PostgreSQL + Prisma schema design (all models)
- [x] **T1.3** NextAuth.js credentials auth (login/signup)
- [x] **T1.4** College verification API (`/api/college/verify`)
- [x] **T1.5** Role-based session (ADMIN / STUDENT / RECRUITER in JWT)
- [x] **T1.6** Seed data script (`prisma/seed.ts`)

### Phase 1: Student Flow
- [x] **T1.7** Student signup with college code
- [x] **T1.8** Student profile completion (onboarding)
- [x] **T1.9** Waiting for approval page (auto-refresh)
- [x] **T1.10** Student dashboard layout (fixed sidebar, access control)
- [x] **T1.11** Student profile view/edit page
- [x] **T1.12** Student dashboard homepage (stats, recommended jobs — mock)

### Phase 1: Admin Flow
- [x] **T1.13** Admin dashboard layout + sidebar
- [x] **T1.14** Admin: Pending students list + Approve/Reject
- [x] **T1.15** Admin: Rejected students list + Recover
- [x] **T1.16** Admin: Recruiter invite system (email + link)
- [x] **T1.17** Email notifications (Nodemailer: approval, rejection, invite)
- [x] **T1.18** Admin dashboard homepage (mock stats/charts)

### Phase 1: Recruiter Flow
- [x] **T1.19** Recruiter invite-based signup
- [x] **T1.20** Recruiter dashboard layout + sidebar
- [x] **T1.21** Recruiter dashboard homepage (mock stats)
- [x] **T1.22** Recruiter: Post Job form (`/recruiters/dashboard/jobs/create`)
- [x] **T1.23** Recruiter: POST `/api/jobs` endpoint
- [x] **T1.24** Recruiter: My Jobs list (real DB data)
- [x] **T1.25** Recruiter: Job Detail page with applicant list (`/jobs/[jobId]`)

### Phase 2: Job Board & Applications
- [x] **T2.1** Student Job Listing Page (Real Data)
- [x] **T2.2** Job Details Modal for Students (Real Data)
- [x] **T2.3** File Upload Infrastructure (Resumes)
- [x] **T2.4** Student Apply to Job API

---

## 🔥 CURRENT TASK

### **T2.5 — Student Applications Tracking Page (Real Data)**
> **Priority:** 🟠 High
>
> **Purpose:** Students see their submitted applications with status
>
> **Files to create/modify:**
> - `app/students/dashboard/applications/page.tsx` — Convert to server component
> - `components/applicationspage/ApplicationsList.tsx` — Fetch real data
> - `components/applicationspage/ApplicationCard.tsx` — Display real data
>
> **Dependencies:** T2.4 ✅
>
> **Completion criteria:**
> - Shows all applications with status
> - Shows match score (placeholder until ATS engine)
> - Sort by applied date

---

## 📋 UPCOMING TASKS (Prioritized Build Order)

### Phase 2: Job Board & Applications

#### **T2.6 — Recruiter: View & Manage Applications (Real Data)**
> **Purpose:** Recruiter's "Candidates" page shows real applications
> **Files:**
> - `app/recruiters/dashboard/applications/page.tsx` — Convert from mock to real data
> - `app/api/applications/[id]/route.ts` — PATCH to update status
> **Dependencies:** T2.4
> **Completion criteria:**
> - Recruiter sees all applications across their jobs
> - Can filter by job and status
> - Can Shortlist / Reject / Hire candidates
> - Status updates are persisted

### Phase 3: ATS Engine (Core MCA Project Value)

#### **T3.1 — Basic Keyword Match ATS (Next.js)**
> **Purpose:** Simple text-based skill matching (no Python needed yet)
> **Files:**
> - `lib/ats.ts` — New: keyword extraction + matching logic
> - Modify `app/api/applications/route.ts` — Run ATS on submission
> **Dependencies:** T2.4
> **Completion criteria:**
> - Extract skills from resume text (basic keyword list)
> - Compare against job `requiredSkills` + description
> - Generate `matchScore`, `extractedSkills`, `missingSkills`
> - Store results in Application record

#### **T3.2 — Python/FastAPI Microservice (AI Engine)**
> **Purpose:** Advanced resume parsing with NLP for MCA project complexity
> **Files:**
> - `ats-engine/` — New directory: Python FastAPI service
> - `ats-engine/main.py` — REST API
> - `ats-engine/parser.py` — PDF text extraction (PyPDF2 / pdfminer)
> - `ats-engine/matcher.py` — Semantic matching (spaCy / sentence-transformers)
> - Update `lib/ats.ts` — Call Python service instead of JS logic
> **Dependencies:** T3.1 (can work with basic first, then upgrade)
> **Completion criteria:**
> - Python service parses PDF resume
> - Extracts skills, education, experience
> - Semantic matching against job description
> - Returns match score + analysis
> - Next.js calls Python API and stores results

#### **T3.3 — ATS Results Display**
> **Purpose:** Show ATS analysis to both students and recruiters
> **Files:**
> - `components/applicationspage/ApplicationDetailsModal.tsx` — Show match details
> - Recruiter job detail page — Show ranked candidates
> **Dependencies:** T3.1
> **Completion criteria:** Match score, extracted skills, missing skills visible

### Phase 4: Dashboard & Analytics (Real Data)

#### **T4.1 — Student Dashboard with Real Stats**
> **Purpose:** Replace mock data on student dashboard
> **Files:** `app/students/dashboard/page.tsx`, `components/dashboard/StatsCards.tsx`
> **Dependencies:** T2.5
> **Completion criteria:** Shows real job count, application count, interview count

#### **T4.2 — Recruiter Dashboard with Real Stats**
> **Purpose:** Replace mock data on recruiter dashboard
> **Files:** `app/recruiters/dashboard/page.tsx`
> **Dependencies:** T2.6
> **Completion criteria:** Shows real active jobs, total applicants, shortlisted, hired

#### **T4.3 — Admin Dashboard with Real Stats**
> **Purpose:** Replace mock data on admin dashboard
> **Files:** `app/admin/dashboard/page.tsx`
> **Dependencies:** T2.6
> **Completion criteria:** Shows real student count, recruiter count, job count, hire count

#### **T4.4 — Admin: Job Management Page**
> **Purpose:** Admin can view/manage all jobs across college
> **Files:** `app/admin/dashboard/jobs/page.tsx`
> **Dependencies:** T1.22
> **Completion criteria:** List all jobs, filter by recruiter, status

### Phase 5: Polish & Technical Debt

#### **T5.1 — Dynamic Sidebar User Info**
> **Purpose:** All 3 sidebars show hardcoded names. Should be dynamic from session.
> **Files:** All 3 layout files
> **Dependencies:** None
> **Completion criteria:** Shows real user name, email, avatar initials

#### **T5.2 — Proper Logout**
> **Purpose:** Sidebars have `console.log("Logging out...")`. Need real signOut.
> **Files:** All 3 layout files
> **Dependencies:** None
> **Completion criteria:** Calls `signOut()` from next-auth

#### **T5.3 — Error Handling & Loading States**
> **Purpose:** Many pages lack proper error/loading states
> **Dependencies:** None

#### **T5.4 — Student Profile: Skills & Resume Upload**
> **Purpose:** Students should add skills to their profile for better ATS matching
> **Files:** Profile page + schema update
> **Dependencies:** T2.3

#### **T5.5 — Admin: Approved/All Students Tabs**
> **Purpose:** Currently only Pending + Rejected tabs exist
> **Files:** `app/admin/dashboard/students/page.tsx`
> **Dependencies:** None

#### **T5.6 — Recruiter Profile Page (Real Data)**
> **Purpose:** Currently placeholder page
> **Files:** `app/recruiters/dashboard/profile/page.tsx`
> **Dependencies:** None

---

## 🏗️ Technical Debt Log

| Issue | Location | Severity | Status |
|-------|----------|----------|--------|
| ~~Mock data in student jobs page~~ | `components/jobspage/JobsList.tsx` | ~~High~~ | ✅ Fixed |
| Mock data in student applications | `components/applicationspage/ApplicationsList.tsx` | High | Pending |
| Mock data in recruiter candidates page | `app/recruiters/dashboard/applications/page.tsx` | High | Pending |
| Mock data in recruiter dashboard | `app/recruiters/dashboard/page.tsx` | Medium | Pending |
| Mock data in admin dashboard | `app/admin/dashboard/page.tsx` | Medium | Pending |
| Mock data in student dashboard | `components/dashboard/*` | Medium | Pending |
| Hardcoded sidebar user info | All 3 layouts | Medium | Pending |
| `console.log` logout instead of `signOut()` | All 3 layouts | Medium | Pending |
| ~~No file upload infrastructure~~ | Global | ~~High~~ | ✅ Fixed |
| Commented-out old code in student dashboard | `app/students/dashboard/page.tsx` (L79-L123) | Low | Pending |
| ~~ApplyJobModal not connected to API~~ | `components/jobspage/ApplyJobModal.tsx` | ~~High~~ | ✅ Fixed |
| ApplicationDetailsModal uses mock data | `components/applicationspage/ApplicationDetailsModal.tsx` | Medium | Pending |

---

## 📁 Architecture Map

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                │
├──────────┬──────────────┬──────────────┬────────────┤
│  Admin   │   Student    │  Recruiter   │   Auth     │
│Dashboard │  Dashboard   │  Dashboard   │  Pages     │
├──────────┴──────────────┴──────────────┴────────────┤
│                  API ROUTES (/api/*)                 │
│  admin/*  │  students/*  │  jobs/*  │ applications/*│
├─────────────────────────────────────────────────────┤
│               BUSINESS LOGIC (lib/)                 │
│    auth.ts  │  prisma.ts  │  email.ts  │  ats.ts   │
├─────────────────────────────────────────────────────┤
│              DATABASE (PostgreSQL + Prisma)          │
│  User │ College │ Job │ Application │ StudentProfile│
├─────────────────────────────────────────────────────┤
│           FUTURE: Python ATS Microservice            │
│     PDF Parser  │  Skill Extractor  │  Matcher      │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 Next Session Checklist
When resuming development:
1. Read this file first
2. Check "CURRENT TASK" section
3. Implement without re-planning
4. After completion, update this file
5. Move to next task automatically
