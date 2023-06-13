/*
  Warnings:

  - Added the required column `studentId` to the `response_tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `response_questions` MODIFY `response` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `response_tests` ADD COLUMN `studentId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `response_tests` ADD CONSTRAINT `response_tests_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
