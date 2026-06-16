# Project Diagrams for CampusHire ATS

This document contains Mermaid diagrams illustrating the architecture, database schema, and key workflows of the CampusHire College ATS System.

## 1. Entity Relationship Diagram (ERD)

This diagram represents the database schema defined in `prisma/schema.prisma`.

```mermaid
erDiagram
    User ||--o{ Account : "has"
    User ||--o{ Session : "has"
    User ||--o| StudentProfile : "has"
    User ||--o| RecruiterProfile : "has"
    User }|--|| College : "belongs directly to"
    
    College ||--o{ User : "has members"
    College ||--o{ Job : "has postings"
    College ||--o{ RecruiterInvite : "issues"

    StudentProfile ||--o| User : "is a"
    StudentProfile ||--o{ Application : "submits"

    RecruiterProfile ||--o| User : "is a"
    RecruiterProfile ||--o{ Job : "posts"

    Job }|--|| RecruiterProfile : "posted by"
    Job }|--|| College : "belongs to"
    Job ||--o{ Application : "receives"

    Application }|--|| StudentProfile : "submitted by"
    Application }|--|| Job : "applied to"

    User {
        String id
        String email
        String role "ADMIN, STUDENT, RECRUITER"
        String status "PENDING, APPROVED, REJECTED"
        String collegeId
    }

    StudentProfile {
        String userId
        String firstName
        String lastName
        String rollNumber
        String branch
        Boolean profileCompleted
    }

    RecruiterProfile {
        String userId
        String companyName
        String website
    }

    Job {
        String id
        String title
        String status "ACTIVE, CLOSED, DRAFT"   
        String recruiterId
        String collegeId
    }

    Application {
        String id
        String status "PENDING, APPLIED, SHORTLISTED, REJECTED, HIRED"
        Float matchScore
        String resumeUrl
    }

    College {
        String id
        String name
        String code
    }
```

## 2. System Architecture

High-level overview of the system components and their interactions.

```mermaid
graph TB
    subgraph "Frontend (Next.js)"
        Client[Web Client]
        AdminDash[Admin Dashboard]
        StudentDash[Student Dashboard]
        RecruiterDash[Recruiter Dashboard]
    end

    subgraph "Backend (Next.js API Routes)"
        AuthAPI[Auth API / NextAuth]
        JobAPI[Jobs API]
        AppAPI[Applications API]
        AdminAPI[Admin Management API]
        UploadAPI[File Upload API]
    end

    subgraph "Database & Storage"
        DB[(PostgreSQL)]
        LocalStorage[Local File Storage]
    end

    subgraph "External Services"
        Email[Nodemailer / Gmail SMTP]
        ATSEngine[Python ATS Service (Future)]
    end

    Client --> AdminDash
    Client --> StudentDash
    Client --> RecruiterDash

    AdminDash --> AuthAPI
    AdminDash --> AdminAPI
    
    StudentDash --> AuthAPI
    StudentDash --> JobAPI
    StudentDash --> AppAPI
    StudentDash --> UploadAPI
    
    RecruiterDash --> AuthAPI
    RecruiterDash --> JobAPI
    RecruiterDash --> AppAPI

    AuthAPI --> DB
    JobAPI --> DB
    AppAPI --> DB
    AdminAPI --> DB
    
    UploadAPI --> LocalStorage
    
    AdminAPI --> Email
    AppAPI -.-> ATSEngine
```

## 3. Student Onboarding & Approval Flow

Visualizes the process of a student signing up, completing their profile, and getting approved by an admin.

```mermaid
stateDiagram-v2
    [*] --> Signup: Student registers
    Signup --> EmailVerification: Checks College Code
    EmailVerification --> ProfileCreation: Role = STUDENT / Status = PENDING
    
    state "Profile Incomplete" as ProfileCreation {
        [*] --> EnterDetails
        EnterDetails --> SubmitProfile
    }

    ProfileCreation --> WaitingApproval: Profile Completed
    
    state "Admin Review" as WaitingApproval {
        [*] --> PendingList
        PendingList --> Review
        Review --> Decision
    }

    Decision --> Approved: Admin Approves
    Decision --> Rejected: Admin Rejects

    Approved --> DashboardAccess: Status = APPROVED
    Rejected --> ContactAdmin: Status = REJECTED
    
    DashboardAccess --> [*]
```

## 4. Job Application Process (Sequence Diagram)

Detailed sequence of events when a student applies for a job.

```mermaid
sequenceDiagram
    actor Student
    participant UI as Student UI
    participant API as Next.js API
    participant DB as Database
    participant FS as File System

    Student->>UI: Clicks "Apply Now"
    UI->>Student: Opens Application Modal
    Student->>UI: Uploads Resume (PDF)
    
    activate UI
    UI->>API: POST /api/upload (FormData)
    activate API
    API->>FS: Save File
    FS-->>API: File Path
    API-->>UI: Return File URL
    deactivate API
    
    Student->>UI: Clicks "Submit Application"
    UI->>API: POST /api/applications
    activate API
    API->>DB: Check for duplicate application
    alt Already Applied
        DB-->>API: Error
        API-->>UI: Show "Already Applied"
    else New Application
        API->>DB: Create Application Record
        DB-->>API: Success
        API-->>UI: Show Success Message
    end
    deactivate API
    deactivate UI
```

## 5. Recruiter Job Management Lifecycle

Flowchart showing the recruiter's capabilities regarding job postings.

```mermaid
flowchart TD
    Start((Recruiter Log In)) --> Dashboard[Recruiter Dashboard]
    Dashboard --> Actions{Choose Action}
    
    Actions -->|Post Job| CreateForm[Job Creation Form]
    CreateForm --> Validate{Validate Inputs}
    Validate -- Invalid --> CreateForm
    Validate -- Valid --> SaveJob[Save to DB (Status: ACTIVE)]
    SaveJob --> ViewJobs[My Jobs List]
    
    Actions -->|View Jobs| ViewJobs
    ViewJobs --> SelectJob[Select Job]
    SelectJob --> JobDetails[Job Details Page]
    
    JobDetails --> ViewApplicants[View Applicants]
    ViewApplicants --> Screen{Screen Candidate}
    
    Screen -->|Shortlist| StatusShort[Mark as SHORTLISTED]
    Screen -->|Reject| StatusReject[Mark as REJECTED]
    Screen -->|Hire| StatusHire[Mark as HIRED]
    
    StatusShort --> UpdateDB[(Update Application Status)]
    StatusReject --> UpdateDB
    StatusHire --> UpdateDB
```

## 6. Admin Management & System States

State diagram for the different user roles and their transitions managed by the Admin.

```mermaid
stateDiagram-v2
    direction LR
    
    state "User Registration" as Reg {
        [*] --> Unverified
        Unverified --> Verified: Email Verified
    }
    
    state "User Status" as Status {
        [*] --> PENDING
        PENDING --> APPROVED: Admin Action
        PENDING --> REJECTED: Admin Action
        REJECTED --> APPROVED: Admin Recover
    }

    state "Application Status" as AppStatus {
        [*] --> APPLIED
        APPLIED --> SHORTLISTED: Recruiter Action
        APPLIED --> REJECTED: Recruiter Action
        SHORTLISTED --> HIRED: Recruiter Action
        SHORTLISTED --> REJECTED
    }
```