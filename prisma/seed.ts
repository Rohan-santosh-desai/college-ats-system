// prisma/seed.ts
import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("admin123", 10);
  const studentPassword = await bcrypt.hash("student123", 10);

  /* -------------------------
     College 1 - Demo College
  -------------------------- */
  const college1 = await prisma.college.upsert({
    where: { code: "DEMO123" },
    update: {},
    create: {
      name: "Demo College",
      code: "DEMO123",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@demo.com" },
    update: { status: UserStatus.APPROVED },
    create: {
      name: "Demo College Admin",
      email: "admin@demo.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      status: UserStatus.APPROVED,
      collegeId: college1.id,
    },
  });

  // --- College 1: Student 1 ---
  const student1 = await prisma.user.upsert({
    where: { email: "rahul.sharma@demo.com" },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "rahul.sharma@demo.com",
      password: studentPassword,
      role: UserRole.STUDENT,
      status: UserStatus.PENDING,
      collegeId: college1.id,
    },
  });

  await prisma.studentProfile.upsert({
    where: { userId: student1.id },
    update: {},
    create: {
      userId: student1.id,
      firstName: "Rahul",
      lastName: "Sharma",
      rollNumber: "DEMO-2024-001",
      branch: "Computer Science",
      graduationYear: 2026,
      profileCompleted: true,
    },
  });

  // --- College 1: Student 2 ---
  const student2 = await prisma.user.upsert({
    where: { email: "priya.patel@demo.com" },
    update: {},
    create: {
      name: "Priya Patel",
      email: "priya.patel@demo.com",
      password: studentPassword,
      role: UserRole.STUDENT,
      status: UserStatus.PENDING,
      collegeId: college1.id,
    },
  });

  await prisma.studentProfile.upsert({
    where: { userId: student2.id },
    update: {},
    create: {
      userId: student2.id,
      firstName: "Priya",
      lastName: "Patel",
      rollNumber: "DEMO-2024-002",
      branch: "Information Technology",
      graduationYear: 2025,
      profileCompleted: true,
    },
  });

  console.log("✅ Demo College seeded (1 admin + 2 students)");

  /* -------------------------
     College 2 - Tech University
  -------------------------- */
  const college2 = await prisma.college.upsert({
    where: { code: "TECH456" },
    update: {},
    create: {
      name: "Tech University",
      code: "TECH456",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@tech.com" },
    update: { status: UserStatus.APPROVED },
    create: {
      name: "Tech University Admin",
      email: "admin@tech.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      status: UserStatus.APPROVED,
      collegeId: college2.id,
    },
  });

  // --- College 2: Student 3 ---
  const student3 = await prisma.user.upsert({
    where: { email: "amit.verma@tech.com" },
    update: {},
    create: {
      name: "Amit Verma",
      email: "amit.verma@tech.com",
      password: studentPassword,
      role: UserRole.STUDENT,
      status: UserStatus.PENDING,
      collegeId: college2.id,
    },
  });

  await prisma.studentProfile.upsert({
    where: { userId: student3.id },
    update: {},
    create: {
      userId: student3.id,
      firstName: "Amit",
      lastName: "Verma",
      rollNumber: "TECH-2024-001",
      branch: "MCA",
      graduationYear: 2026,
      profileCompleted: true,
    },
  });

  // --- College 2: Student 4 ---
  const student4 = await prisma.user.upsert({
    where: { email: "sneha.desai@tech.com" },
    update: {},
    create: {
      name: "Sneha Desai",
      email: "sneha.desai@tech.com",
      password: studentPassword,
      role: UserRole.STUDENT,
      status: UserStatus.PENDING,
      collegeId: college2.id,
    },
  });

  await prisma.studentProfile.upsert({
    where: { userId: student4.id },
    update: {},
    create: {
      userId: student4.id,
      firstName: "Sneha",
      lastName: "Desai",
      rollNumber: "TECH-2024-002",
      branch: "Electronics & Communication",
      graduationYear: 2025,
      profileCompleted: true,
    },
  });

  console.log("✅ Tech University seeded (1 admin + 2 students)");

  console.log("\n--- Logins ---");
  console.log("Admin 1: admin@demo.com / admin123");
  console.log("Admin 2: admin@tech.com / admin123");
  console.log("Students: [email]@demo.com or @tech.com / student123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
