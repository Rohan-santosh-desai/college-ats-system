import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    // 1. Get admin session
    const session = await getServerSession(authOptions);  

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

 
    const collegeId = (session.user as any).collegeId;

    if (!collegeId) {
      return NextResponse.json(
        { error: "College ID not found" },
        { status: 400 }
      );
    }

    // 2. Read body
    const body = await req.json();
    const { email, companyName } = body;

    // 3. Validate input
    if (!email || !companyName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 4. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 5. Generate invite token
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 6. Save invite
    await prisma.recruiterInvite.create({
      data: {
        email,
        companyName,
        collegeId,
        token,
        expiresAt,
      },
    });

    const inviteLink = `${process.env.NEXTAUTH_URL}/invite/${token}`;

      return NextResponse.json({
        success: true,
        inviteLink,
      });

  

  } catch (error) {
    console.error("INVITE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create invite" },
      { status: 500 }
    );
  }
}
