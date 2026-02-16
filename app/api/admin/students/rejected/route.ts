import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        // Get collegeId from session
        const collegeId = (session.user as any).collegeId;

        if (!collegeId) {
            return NextResponse.json(
                { message: "Admin's college not found in session" },
                { status: 404 }
            );
        }

        const rejectedStudents = await prisma.user.findMany({
            where: {
                role: "STUDENT",
                status: "REJECTED",
                collegeId: collegeId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                studentProfile: true
            },
        });

        return NextResponse.json({ students: rejectedStudents }, { status: 200 });

    } catch (error) {
        console.error("Error fetching rejected students:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
