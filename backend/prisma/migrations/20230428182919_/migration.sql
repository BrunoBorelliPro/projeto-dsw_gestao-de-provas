/*
  Warnings:

  - You are about to drop the column `testId` on the `questions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `questions` DROP FOREIGN KEY `questions_testId_fkey`;

-- AlterTable
ALTER TABLE `questions` DROP COLUMN `testId`;

-- CreateTable
CREATE TABLE `questions_on_tests` (
    `id` VARCHAR(191) NOT NULL,
    `question_id` VARCHAR(191) NOT NULL,
    `test_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_QuestionToTest` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_QuestionToTest_AB_unique`(`A`, `B`),
    INDEX `_QuestionToTest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `questions_on_tests` ADD CONSTRAINT `questions_on_tests_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions_on_tests` ADD CONSTRAINT `questions_on_tests_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToTest` ADD CONSTRAINT `_QuestionToTest_A_fkey` FOREIGN KEY (`A`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToTest` ADD CONSTRAINT `_QuestionToTest_B_fkey` FOREIGN KEY (`B`) REFERENCES `tests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
