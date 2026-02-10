# Admin Dashboard Implementation Plan

## Goal
Create a dashboard for Admin users to view and approve pending Student and Recruiter accounts. This is critical because currently, new users are stuck in `PENDING` status.

## User Review Required
> [!NOTE]
> We will strictly enforce role-based access control. Only users with `role: "ADMIN"` can access these routes.

## Proposed Changes

### Database
No schema changes required. We will use the existing `User` model's `status` field (`PENDING`, `APPROVED`, `REJECTED`).

### API Layer
#### [NEW] `app/api/admin/users/route.ts`
- **GET**: Fetch all users with `status: "PENDING"`.
- **PATCH**: Update a user's status to `APPROVED` or `REJECTED`.

### UI Layer
#### [NEW] `app/admin/dashboard/page.tsx`
- Fetch pending users on load.
- Display a table of pending users (Name, Email, Role, College).
- "Approve" and "Reject" buttons for each row.

## Verification Plan
### Manual Verification
1. Login as an Admin user (we may need to manually set a user to ADMIN in the DB first via Prisma Studio).
2. Navigate to `/admin/dashboard`.
3. Verify the pending student account we just created is visible.
4. Click "Approve".
5. Logout and login as the Student.
6. Verify the Student is now redirected to the main Dashboard instead of "Waiting Approval".
