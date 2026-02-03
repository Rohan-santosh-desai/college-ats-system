// prisma/seed.ts
import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Initialize Prisma with the pg adapter (same as lib/prisma.ts)
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Create a Dummy College
  // We use upsert to avoid errors if you run this script twice
  const college = await prisma.college.create({
    data: {
      name: "Goa Engineering College (Demo)",
    }
  });

  console.log(`✅ Created College: ${college.name} (ID: ${college.id})`);

  // 2. Create a Recruiter Invite linked to this College
  const invite = await prisma.recruiterInvite.create({
    data: {
      email: "recruiter@techcorp.com",
      companyName: "Tech Corp",
      token: "demo-invite-token-123", // Use this token in your URL to test
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
      collegeId: college.id, // <--- This fixes your Foreign Key error
    },
  });

  console.log(`✅ Created Invite Token: ${invite.token}`);
  console.log(`   Link: http://localhost:3000/invite/${invite.token}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });