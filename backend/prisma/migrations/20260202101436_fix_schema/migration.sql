/*
  Warnings:

  - The primary key for the `companies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employee_count` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `revenue_estimate` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `companies` table. All the data in the column will be lost.
  - The `id` column on the `companies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `leads` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authority_level` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `budget_approved` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `lead_score` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `pain_points` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `urgency_timeline` on the `leads` table. All the data in the column will be lost.
  - The `id` column on the `leads` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ai_analysis` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[domain]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ai_analysis" DROP CONSTRAINT "ai_analysis_lead_id_fkey";

-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_company_id_fkey";

-- AlterTable
ALTER TABLE "companies" DROP CONSTRAINT "companies_pkey",
DROP COLUMN "employee_count",
DROP COLUMN "revenue_estimate",
DROP COLUMN "website",
ADD COLUMN     "domain" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "companies_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "leads" DROP CONSTRAINT "leads_pkey",
DROP COLUMN "authority_level",
DROP COLUMN "budget_approved",
DROP COLUMN "company_id",
DROP COLUMN "lead_score",
DROP COLUMN "pain_points",
DROP COLUMN "urgency_timeline",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "leads_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ai_analysis";

-- CreateIndex
CREATE UNIQUE INDEX "companies_domain_key" ON "companies"("domain");
