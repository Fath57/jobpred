/*
  Warnings:

  - You are about to drop the column `cvId` on the `candidate_job_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `candidate_job_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `candidate_job_preferences` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."candidate_job_preferences" DROP CONSTRAINT "candidate_job_preferences_cvId_fkey";

-- DropIndex
DROP INDEX "public"."candidate_job_preferences_cvId_idx";

-- AlterTable
ALTER TABLE "candidate_job_preferences" DROP COLUMN "cvId",
DROP COLUMN "isActive",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "candidates" ADD COLUMN     "cvId" TEXT;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "app_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
