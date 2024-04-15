/*
  Warnings:

  - Added the required column `code` to the `Configuration` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Configuration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME
);
INSERT INTO "new_Configuration" ("createdAt", "deletedAt", "description", "id", "value") SELECT "createdAt", "deletedAt", "description", "id", "value" FROM "Configuration";
DROP TABLE "Configuration";
ALTER TABLE "new_Configuration" RENAME TO "Configuration";
CREATE UNIQUE INDEX "Configuration_code_key" ON "Configuration"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
