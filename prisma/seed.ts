// prisma/seed.ts
import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient, UserRole } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from "bcryptjs";

// Initialize Prisma with the pg adapter (same as lib/prisma.ts)
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // 1️⃣ Create College
  const college = await prisma.college.create({
    data: {
      name: "Demo College",
      code: "DEMO123",
    },
  });

  console.log("✅ College created:", college.name);

  // 2️⃣ Create Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const adminUser = await prisma.user.create({
    data: {
      name: "College Admin",
      email: "admin@demo.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      collegeId: college.id,
    },
  });

  console.log("✅ Admin user created");
  console.log("Email:", adminUser.email);
  console.log("Password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
