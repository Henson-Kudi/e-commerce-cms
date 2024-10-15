/*
  Warnings:

  - You are about to drop the column `icreatedBy` on the `Faq` table. All the data in the column will be lost.
  - You are about to drop the column `icreatedBy` on the `PrivacyPolicy` table. All the data in the column will be lost.
  - You are about to drop the column `icreatedBy` on the `TermsOfService` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Faq` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `PrivacyPolicy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `TermsOfService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "appLink" DROP NOT NULL,
ALTER COLUMN "lastModifiedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "lastModifiedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Faq" DROP COLUMN "icreatedBy",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "lastModifiedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PrivacyPolicy" DROP COLUMN "icreatedBy",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTags" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ALTER COLUMN "lastModifiedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TermsOfService" DROP COLUMN "icreatedBy",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTags" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ALTER COLUMN "lastModifiedBy" DROP NOT NULL;
