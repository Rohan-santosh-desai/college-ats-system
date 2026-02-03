import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(req: Request) {

    const token = randomUUID();
    const expiresAt = new Date();
  try {
    // 1. Read body
    const body = await req.json();
    const { email , companyName, collegeId } = body;

    // 2. Validate input
    if (!email || !companyName || !collegeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 4. Create invite record
    const invite = await prisma.recruiterInvite.create({
      data: {
        email,
        companyName,
        collegeId,
        token,
        expiresAt: new Date(expiresAt.getTime() + 7 * 24 * 60 * 60 * 1000), // Set expiry to 7 days from now
      },
    });

    return NextResponse.json({
      message: "Invite created",
      invite,
    });

  } catch (error) {
    console.error("INVITE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create invite" },
      { status: 500 }
    );
  }
}
