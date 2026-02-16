
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

    // Step 6 — Save profile (upsert) and update User name
    const fullName = `${firstName} ${lastName}`;

    await prisma.$transaction([
      // Update User table with full name
      prisma.user.update({
        where: { id: session.user.id },
        data: { name: fullName },
      }),
      // Update/Create StudentProfile
      prisma.studentProfile.upsert({
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
      }),
    ]);

    // TODO: Send email notification to admin about new student profile
    // This will be implemented when email service is set up

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

// PUT - Update profile (for approved students)
export async function PUT(req: Request) {
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

    // Check if user is approved
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { status: true },
    });

    if (user?.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Only approved students can update their profile" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { firstName, lastName, rollNumber } = body;

    if (!firstName || !lastName || !rollNumber) {
      return NextResponse.json(
        { error: "First name, last name, and roll number are required" },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`;

    await prisma.$transaction([
      // Update User table with full name
      prisma.user.update({
        where: { id: session.user.id },
        data: { name: fullName },
      }),
      // Update StudentProfile
      prisma.studentProfile.update({
        where: { userId: session.user.id },
        data: {
          firstName,
          lastName,
          rollNumber,
        },
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
