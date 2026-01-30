import { defineConfig } from "@prisma/config";
import "dotenv/config"; // <--- This forces the .env file to load

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});