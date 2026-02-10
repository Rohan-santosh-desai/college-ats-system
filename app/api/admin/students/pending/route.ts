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

        // Optimized: Use collegeId from session directly (populated in lib/auth.ts)
        const collegeId = (session.user as any).collegeId;

        if (!collegeId) {
            return NextResponse.json(
                { message: "Admin's college not found in session" },
                { status: 404 }
            );
        }

        const pendingStudents = await prisma.user.findMany({
            where: {
                role: "STUDENT",
                status: "PENDING",
                collegeId: collegeId,
                studentProfile: {
                    profileCompleted: true
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                studentProfile: true
            },
        });

        return NextResponse.json({ students: pendingStudents }, { status: 200 }); // Wrapped in { students: ... } to match frontend expectation

    } catch (error) {
        console.error("Error fetching pending students:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
