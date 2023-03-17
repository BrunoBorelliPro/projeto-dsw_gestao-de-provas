-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "question_type" TEXT NOT NULL DEFAULT 'multiple_choice',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_questions" ("content", "created_at", "id", "updated_at") SELECT "content", "created_at", "id", "updated_at" FROM "questions";
DROP TABLE "questions";
ALTER TABLE "new_questions" RENAME TO "questions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
