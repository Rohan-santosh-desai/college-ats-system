import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
      
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { collegeId: true },
    });
    if (!admin || !admin.collegeId) {
      return NextResponse.json(
        { message: "Admin's college not found" },
        { status: 404 }
      );
    }   

    const pendingStudents = await prisma.user.findMany({
      where: {
        role: "STUDENT",
        status: "PENDING",
        collegeId: admin.collegeId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        studentProfile:true
      },
    });

    return NextResponse.json(pendingStudents, { status: 200 });

  } catch (error) {
    console.error("Error fetching pending students:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
