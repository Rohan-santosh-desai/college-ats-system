
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (session.user.role !== "STUDENT") {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    // Step 4 — Read request body
    const body = await req.json();

    const {
      firstName,
      lastName,
      rollNumber,
      branch,
      graduationYear,
    } = body;

    // Step 5 — Validate fields
    if (
      !firstName ||
      !lastName ||
      !rollNumber ||
      !branch ||
      !graduationYear
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Step 6 — Save profile (upsert)
    await prisma.studentProfile.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        firstName,
        lastName,
        rollNumber,
        branch,
        graduationYear: parseInt(graduationYear),
        profileCompleted: true,
      },
      create: {
        userId: session.user.id,
        firstName,
        lastName,
        rollNumber,
        branch,
        graduationYear: parseInt(graduationYear),
        profileCompleted: true,
      },
    });

    // Step 8 — Return success
    return NextResponse.json({ success: true }, { status: 200 }

    );
  } catch (error) {
    console.error("Profile save error:", error);

    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (session.user.role !== "STUDENT") {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        status: true,
        studentProfile: true,
      },
    });

    return NextResponse.json({
      profile: user?.studentProfile ?? null,
      status: user?.status ?? null,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
