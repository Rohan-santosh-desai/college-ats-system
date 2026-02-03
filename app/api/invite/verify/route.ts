import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token missing" },
        { status: 400 }
      );
    }

    // Find invite in DB
    const invite = await prisma.recruiterInvite.findUnique({
      where: { token },
    });

    // Token not found
    if (!invite) {
      return NextResponse.json(
        { error: "Invalid invite link" },
        { status: 400 }
      );
    }

    // Check expiry
    if (new Date() > invite.expiresAt) {
      return NextResponse.json(
        { error: "Invite link expired" },
        { status: 400 }
      );
    }

      // Invite already used
    if (invite.used) {
      return NextResponse.json(
        { error: "Invite already used" },
        { status: 400 }
      );
    }


    // Success response for frontend
    return NextResponse.json({
      valid: true,
      email: invite.email,
      companyName: invite.companyName,
      collegeId: invite.collegeId,
    });

  } catch (err) {
    console.error("Invite verify error:", err);

    return NextResponse.json(
      { error: "Server error verifying invite" },
      { status: 500 }
    );
  }
}
