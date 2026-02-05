/*
  Warnings:

  - The values [ACTIVE] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `resumeUrl` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `StudentProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `College` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rollNumber` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "public"."User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" TYPE "UserStatus_new" USING ("status"::text::"UserStatus_new");
ALTER TYPE "UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "public"."UserStatus_old";
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "College" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "resumeUrl",
DROP COLUMN "skills",
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "profileCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rollNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "College_code_key" ON "College"("code");

-- CreateIndex
CREATE INDEX "User_collegeId_role_status_idx" ON "User"("collegeId", "role", "status");
