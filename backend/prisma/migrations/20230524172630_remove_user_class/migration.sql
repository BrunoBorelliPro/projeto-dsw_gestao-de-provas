/*
  Warnings:

  - You are about to drop the column `userId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `students_userId_fkey`;

-- DropForeignKey
ALTER TABLE `teachers` DROP FOREIGN KEY `teachers_userId_fkey`;

-- AlterTable
ALTER TABLE `students` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `teachers` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `User`;
