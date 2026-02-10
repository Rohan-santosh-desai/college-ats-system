import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { collegeCode } = await req.json();

    if (!collegeCode) {
      return NextResponse.json(
        { success: false, message: "College code required" },
        { status: 400 }
      );
    }

    const college = await prisma.college.findUnique({
      where: { code: collegeCode },
    });

    if (!college) {
      return NextResponse.json(
        { success: false, message: "Invalid college code" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      collegeId: college.id,
      collegeName: college.name,
    });
  } catch (error) {
    console.error("College verify error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
