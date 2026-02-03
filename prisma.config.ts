import { defineConfig } from "@prisma/config";
import "dotenv/config";

export default defineConfig({
  // 1. Tell Prisma how to run the seed script
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
  
  // 2. Your existing datasource config
  datasource: {
    url: process.env.DATABASE_URL,
  },
});