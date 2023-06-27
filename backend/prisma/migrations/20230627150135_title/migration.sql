/*
  Warnings:

  - Added the required column `title` to the `applied_tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `applied_tests` ADD COLUMN `title` VARCHAR(191) NOT NULL;
