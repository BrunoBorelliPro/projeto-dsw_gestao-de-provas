/*
  Warnings:

  - You are about to drop the column `question_id` on the `AppliedTestAlternatives` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AppliedTestAlternatives` DROP COLUMN `question_id`;

-- AlterTable
ALTER TABLE `AppliedTestQuestions` ADD COLUMN `appliedTestId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `AppliedTestQuestions` ADD CONSTRAINT `AppliedTestQuestions_appliedTestId_fkey` FOREIGN KEY (`appliedTestId`) REFERENCES `applied_tests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
