-- AlterTable
ALTER TABLE "users" ALTER COLUMN "onboardingStep" DROP NOT NULL,
ALTER COLUMN "onboardingStep" SET DEFAULT 1;

-- Add new columns to candidate_job_preferences
ALTER TABLE "candidate_job_preferences" ADD COLUMN "name" TEXT;
ALTER TABLE "candidate_job_preferences" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "candidate_job_preferences" ADD COLUMN "cvId" TEXT;

-- Add foreign key for cvId
ALTER TABLE "candidate_job_preferences" ADD CONSTRAINT "candidate_job_preferences_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "app_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Create index on cvId
CREATE INDEX "candidate_job_preferences_cvId_idx" ON "candidate_job_preferences"("cvId");

-- Migrate existing CV from candidates to their first job preference
UPDATE "candidate_job_preferences" AS cjp
SET "cvId" = c."cvId"
FROM "candidates" AS c
WHERE cjp."candidateId" = c.id
  AND c."cvId" IS NOT NULL
  AND cjp."cvId" IS NULL;

-- Set the first job preference as active for each candidate
WITH ranked_prefs AS (
  SELECT id,
         ROW_NUMBER() OVER (PARTITION BY "candidateId" ORDER BY "createdAt" ASC) as rn
  FROM "candidate_job_preferences"
)
UPDATE "candidate_job_preferences" AS cjp
SET "isActive" = true
FROM ranked_prefs
WHERE cjp.id = ranked_prefs.id AND ranked_prefs.rn = 1;

-- Drop the cvId column from candidates table
ALTER TABLE "candidates" DROP CONSTRAINT IF EXISTS "candidates_cvId_fkey";
ALTER TABLE "candidates" DROP COLUMN IF EXISTS "cvId";
