/*
  Warnings:

  - You are about to drop the column `grade` on the `applied_tests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `applied_tests` DROP COLUMN `grade`;

-- CreateTable
CREATE TABLE `response_tests` (
    `id` VARCHAR(191) NOT NULL,
    `grade` DECIMAL(65, 30) NOT NULL,
    `applied_test_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `response_tests` ADD CONSTRAINT `response_tests_applied_test_id_fkey` FOREIGN KEY (`applied_test_id`) REFERENCES `applied_tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
