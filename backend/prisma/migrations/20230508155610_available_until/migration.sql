/*
  Warnings:

  - Added the required column `available_until` to the `student_tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `student_tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student_tests` ADD COLUMN `available_until` DATETIME(3) NOT NULL,
    ADD COLUMN `grade` DECIMAL(65, 30) NOT NULL;
