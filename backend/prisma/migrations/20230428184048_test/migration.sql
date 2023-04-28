/*
  Warnings:

  - You are about to drop the `questions_on_tests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `questions_on_tests` DROP FOREIGN KEY `questions_on_tests_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `questions_on_tests` DROP FOREIGN KEY `questions_on_tests_test_id_fkey`;

-- DropTable
DROP TABLE `questions_on_tests`;

-- CreateTable
CREATE TABLE `_QuestionToTest` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_QuestionToTest_AB_unique`(`A`, `B`),
    INDEX `_QuestionToTest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_QuestionToTest` ADD CONSTRAINT `_QuestionToTest_A_fkey` FOREIGN KEY (`A`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToTest` ADD CONSTRAINT `_QuestionToTest_B_fkey` FOREIGN KEY (`B`) REFERENCES `tests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
