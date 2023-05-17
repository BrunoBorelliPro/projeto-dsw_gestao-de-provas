/*
  Warnings:

  - You are about to drop the `student_tests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `student_tests` DROP FOREIGN KEY `student_tests_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `student_tests` DROP FOREIGN KEY `student_tests_test_id_fkey`;

-- DropTable
DROP TABLE `student_tests`;

-- CreateTable
CREATE TABLE `applied_test` (
    `id` VARCHAR(191) NOT NULL,
    `grade` DECIMAL(65, 30) NOT NULL,
    `available_until` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `student_id` VARCHAR(191) NOT NULL,
    `test_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `applied_test` ADD CONSTRAINT `applied_test_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applied_test` ADD CONSTRAINT `applied_test_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
