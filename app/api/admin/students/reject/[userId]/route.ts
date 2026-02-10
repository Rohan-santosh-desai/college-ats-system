import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { UserStatus } from "@prisma/client";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {


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

        const student = await prisma.user.findFirst({
            where: {
                id: userId,
                role: "STUDENT",
                collegeId: collegeId,
                studentProfile: {
                    profileCompleted: true, // ensures incomplete not allowed
                },
            },
        });

        if (!student) {
            return NextResponse.json(
                { message: "Student not found or profile incomplete" },
                { status: 404 }
            );
        }

        if (student.status === UserStatus.REJECTED) {
            return NextResponse.json(
                { message: "Student already rejected" },
                { status: 400 }
            );
        }

        if (student.status === UserStatus.APPROVED) {
            return NextResponse.json(
                { message: "Approved students cannot be rejected" },
                { status: 400 }
            );
        }

        await prisma.user.update({
            where: { id: userId },
            data: { status: UserStatus.REJECTED },
        });

        return NextResponse.json({
            success: true,
            message: "Student rejected successfully",
        });

    } catch (error) {
        console.error("Reject error:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
