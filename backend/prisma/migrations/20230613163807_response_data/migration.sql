/*
  Warnings:

  - You are about to drop the `Response` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `response` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Response` DROP FOREIGN KEY `Response_question_id_fkey`;

-- AlterTable
ALTER TABLE `questions` ADD COLUMN `response` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Response`;

-- CreateTable
CREATE TABLE `response_questions` (
    `id` VARCHAR(191) NOT NULL,
    `response` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `question_id` VARCHAR(191) NOT NULL,
    `responseTestId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `response_alternatives` (
    `id` VARCHAR(191) NOT NULL,
    `is_selected` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `response_question_id` VARCHAR(191) NOT NULL,
    `alternative_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `response_questions` ADD CONSTRAINT `response_questions_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `response_questions` ADD CONSTRAINT `response_questions_responseTestId_fkey` FOREIGN KEY (`responseTestId`) REFERENCES `response_tests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `response_alternatives` ADD CONSTRAINT `response_alternatives_response_question_id_fkey` FOREIGN KEY (`response_question_id`) REFERENCES `response_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `response_alternatives` ADD CONSTRAINT `response_alternatives_alternative_id_fkey` FOREIGN KEY (`alternative_id`) REFERENCES `alternatives`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
