/*
  Warnings:

  - You are about to drop the column `alternative` on the `alternatives` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `questions` table. All the data in the column will be lost.
  - Added the required column `content` to the `alternatives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_alternatives" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "question_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "alternatives_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_alternatives" ("created_at", "id", "is_correct", "question_id", "updated_at") SELECT "created_at", "id", "is_correct", "question_id", "updated_at" FROM "alternatives";
DROP TABLE "alternatives";
ALTER TABLE "new_alternatives" RENAME TO "alternatives";
CREATE TABLE "new_questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_questions" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "questions";
DROP TABLE "questions";
ALTER TABLE "new_questions" RENAME TO "questions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
