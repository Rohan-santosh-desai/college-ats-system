import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "STUDENT" || !session.user.collegeId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { jobId, resumeUrl, coverLetter } = body;

        if (!jobId || !resumeUrl) {
            return NextResponse.json(
                { error: "Missing required fields (jobId, resumeUrl)" },
                { status: 400 }
            );
        }

        // 1. Get Student Profile ID
        const studentProfile = await prisma.studentProfile.findUnique({
            where: { userId: session.user.id },
        });

        if (!studentProfile) {
            return NextResponse.json(
                { error: "Student profile not found. Please complete your profile first." },
                { status: 404 }
            );
        }

        // 2. Check if Job exists
        const job = await prisma.job.findUnique({
            where: { id: jobId },
        });

        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        // 3. SECURE: Ensure student can only apply to jobs from their college
        if (job.collegeId !== session.user.collegeId) {
            return NextResponse.json({ error: "You can only apply to jobs from your college" }, { status: 403 });
        }

        // 4. Ensure Job is Active
        if (job.status !== "ACTIVE") {
            return NextResponse.json({ error: "This job is no longer accepting applications" }, { status: 400 });
        }

        // 5. Check for Duplicate Application
        const existingApplication = await prisma.application.findUnique({
            where: {
                studentId_jobId: {
                    studentId: studentProfile.id,
                    jobId: jobId,
                },
            },
        });

        if (existingApplication) {
            return NextResponse.json(
                { error: "You have already applied for this job" },
                { status: 409 }
            );
        }

        // 6. Create Application
        const application = await prisma.application.create({
            data: {
                studentId: studentProfile.id,
                jobId: jobId,
                resumeUrl,
                coverLetter,
                status: "APPLIED",
            },
        });

        return NextResponse.json({ success: true, application });
    } catch (error) {
        console.error("Error submitting application:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}