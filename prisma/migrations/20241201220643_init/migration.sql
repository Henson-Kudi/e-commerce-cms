-- CreateEnum
CREATE TYPE "BannerFileType" AS ENUM ('VIDEO', 'IMAGE');

-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "fileType" "BannerFileType" NOT NULL DEFAULT 'IMAGE';
