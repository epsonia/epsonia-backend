/*
  Warnings:

  - Added the required column `name` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "windowsScore" INTEGER NOT NULL,
    "linuxScore" INTEGER NOT NULL
);
INSERT INTO "new_Team" ("id", "linuxScore", "totalScore", "windowsScore") SELECT "id", "linuxScore", "totalScore", "windowsScore" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
