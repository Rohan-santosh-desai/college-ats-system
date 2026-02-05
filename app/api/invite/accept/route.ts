import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, fullName, password } = await req.json();

    if (!token || !fullName || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Find invite
    const invite = await prisma.recruiterInvite.findUnique({
      where: { token },
    });

    if (!invite) {
      return NextResponse.json(
        { error: "Invalid invite link" },
        { status: 400 }
      );
    }

    if (invite.used) {
      return NextResponse.json(
        { error: "Invite already used" },
        { status: 400 }
      );
    }

    if (new Date() > invite.expiresAt) {
      return NextResponse.json(
        { error: "Invite link expired" },
        { status: 400 }
      );
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Transaction: create user + profile + mark invite used
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email: invite.email,
          name: fullName,
          password: hashedPassword,
          role: "RECRUITER",
          collegeId: invite.collegeId,
          emailVerified: new Date(Date.now()),
        },
      });

      // Create recruiter profile
      await tx.recruiterProfile.create({
        data: {
          userId: user.id,
          companyName: invite.companyName,
          website: "test.com",
        },
      });

      // Mark invite used
      await tx.recruiterInvite.update({
        where: { id: invite.id },
        data: { used: true },
      });

      return user;
    });

    return NextResponse.json({
      success: true,
      userId: result.id,
      email: result.email,
    });

  } catch (err) {
    console.error("Invite accept error:", err);

    return NextResponse.json(
      { error: "Server error accepting invite" },
      { status: 500 }
    );
  }
}
