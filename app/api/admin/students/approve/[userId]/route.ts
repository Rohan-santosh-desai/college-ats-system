import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { UserStatus } from "@prisma/client";
import { sendApprovalEmail } from "@/lib/email";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;

    try {
        const session = await getServerSession(authOptions);

        // 1. Admin auth check
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }


        if (!userId) {
            return NextResponse.json(
                { message: "User ID required" },
                { status: 400 }
            );
        }

        // 2. Get admin college from session
        const collegeId = (session.user as any).collegeId;

        if (!collegeId) {
            return NextResponse.json(
                { message: "Admin college not found" },
                { status: 404 }
            );
        }

        // 3. Find student within same college

        const student = await prisma.user.findFirst({
            where: {
                id: userId,
                role: "STUDENT",
                collegeId: collegeId,
                studentProfile: {
                    is: {
                        profileCompleted: true,
                    },
                },
            },
        });


        if (!student) {
            return NextResponse.json(
                { message: "Student not found or profile incomplete" },
                { status: 404 }
            );
        }

        // 4. Status checks
        if (student.status === UserStatus.APPROVED) {
            return NextResponse.json(
                { message: "Student already approved" },
                { status: 400 }
            );
        }

        if (student.status === UserStatus.REJECTED) {
            return NextResponse.json(
                { message: "Rejected students cannot be approved" },
                { status: 400 }
            );
        }

        // 5. Approve
        await prisma.user.update({
            where: { id: userId },
            data: { status: UserStatus.APPROVED },
        });

        // 6. Send approval email notification
        try {
            await sendApprovalEmail(student.email!, student.name || "Student");
        } catch (emailError) {
            console.error("Failed to send approval email:", emailError);
            // Don't fail the approval if email fails
        }

        return NextResponse.json({
            success: true,
            message: "Student approved successfully",
        });

    } catch (error) {
        console.error("Approve error:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
