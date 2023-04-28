/*
  Warnings:

  - You are about to drop the `_QuestionToTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_QuestionToTest` DROP FOREIGN KEY `_QuestionToTest_A_fkey`;

-- DropForeignKey
ALTER TABLE `_QuestionToTest` DROP FOREIGN KEY `_QuestionToTest_B_fkey`;

-- DropTable
DROP TABLE `_QuestionToTest`;
