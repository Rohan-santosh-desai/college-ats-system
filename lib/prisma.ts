import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
  // 1. Create a connection pool
  const connectionString = `${process.env.DATABASE_URL}`;
  const pool = new Pool({ connectionString });

  // 2. Create the Prisma adapter
  const adapter = new PrismaPg(pool);

  // 3. Pass the adapter to PrismaClient
  return new PrismaClient({
    adapter,
    log: ["query"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;