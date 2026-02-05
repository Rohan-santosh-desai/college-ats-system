import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { UserStatus } from "@prisma/client";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 }
      );
    }

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

    const student = await prisma.user.findFirst({
      where: {
        id: userId,
        role: "STUDENT",
        collegeId: admin.collegeId,
        studentProfile: {
          profileCompleted: true,
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
