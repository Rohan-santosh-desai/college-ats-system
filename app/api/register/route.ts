import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { use } from "react";

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();

    // Required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // Check duplicate user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Allow only safe roles
    const allowedRoles = ["STUDENT", "RECRUITER"];

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role selected" },
        { status: 400 }
      );
    }



    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });




    if (user.role === "STUDENT") {
      const existingStudentprofiler = await prisma.studentProfile.findUnique({
        where: { userId: user.id },
      });

      if (!existingStudentprofiler) {

        await prisma.studentProfile.create({
          data: {
            userId: user.id,
            firstName: name || "",
            lastName: "",
          },
        });
      }
    }

    if (user.role === "RECRUITER") {
      const existingRecruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId: user.id },
      });

      if (!existingRecruiterProfile) {

        await prisma.recruiterProfile.create({
          data: {
            userId: user.id,
            companyName: name || "Recruiter Company",
          },
        });
      }
    }

    // Return safe data only
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  }  catch (error) {
  console.error("REGISTER ERROR:", error);

  return NextResponse.json(
    { error: "Registration failed" },
    { status: 500 }
  );
   }
  }
