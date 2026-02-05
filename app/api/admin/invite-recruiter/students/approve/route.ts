import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { UserStatus } from "@prisma/client";

export async function POST(request: Request) {
  
  try {
    const session = await getServerSession(authOptions);
  
    // 1. Admin auth check
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 }
      );
    }

    // 2. Get admin college
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { collegeId: true },
    });

    if (!admin?.collegeId) {
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
        collegeId: admin.collegeId,
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
