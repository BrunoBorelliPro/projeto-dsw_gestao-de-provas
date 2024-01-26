-- DropIndex
DROP INDEX `response_alternatives_alternative_id_fkey` ON `response_alternatives`;

-- DropIndex
DROP INDEX `response_questions_question_id_fkey` ON `response_questions`;

-- CreateTable
CREATE TABLE `AppliedTestQuestions` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `question_type` VARCHAR(191) NOT NULL DEFAULT 'multiple_choice',
    `response` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppliedTestAlternatives` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `is_correct` BOOLEAN NOT NULL,
    `question_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `appliedTestQuestionsId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AppliedTestAlternatives` ADD CONSTRAINT `AppliedTestAlternatives_appliedTestQuestionsId_fkey` FOREIGN KEY (`appliedTestQuestionsId`) REFERENCES `AppliedTestQuestions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
