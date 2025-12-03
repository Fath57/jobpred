/*
  Warnings:

  - You are about to drop the column `cvId` on the `candidates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."candidate_job_preferences" DROP CONSTRAINT "candidate_job_preferences_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."candidates" DROP CONSTRAINT "candidates_cvId_fkey";

-- AlterTable
ALTER TABLE "public"."candidate_job_preferences" ADD COLUMN     "cvId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "public"."candidates" DROP COLUMN "cvId";

-- CreateIndex
CREATE INDEX "candidate_job_preferences_cvId_idx" ON "public"."candidate_job_preferences"("cvId");

-- AddForeignKey
ALTER TABLE "public"."candidate_job_preferences" ADD CONSTRAINT "candidate_job_preferences_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "public"."candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."candidate_job_preferences" ADD CONSTRAINT "candidate_job_preferences_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "public"."app_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
