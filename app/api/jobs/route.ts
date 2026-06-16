import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.collegeId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const jobs = await prisma.job.findMany({
            where: {
                collegeId: session.user.collegeId,
                status: "ACTIVE",
            },
            include: {
                recruiter: {
                    select: {
                        companyName: true,
                    }
                },
                _count: {
                    select: { applications: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({ success: true, jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "RECRUITER" || !session.user.collegeId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const data = await req.json();
        const { title, description, location, salary, jobType, requirements } = data;
        const recruiterProfile = await prisma.recruiterProfile.findUnique({ where: { userId: session.user.id }, });
        if (!recruiterProfile) {
            return NextResponse.json({ error: "Recruiter profile not found" }, { status: 404 });
        }

        const job = await prisma.job.create({
            data: {
                title,
                description: description + "\n\nRequirements:\n" + requirements, // Combine them for now
                location,
                salary,
                jobType,
                recruiterId: recruiterProfile.id,
                collegeId: session.user.collegeId,
                status: "ACTIVE"
            },
        });



        return NextResponse.json({ success: true, job });
    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
