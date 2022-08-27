/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `EventAction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EventAction_name_key" ON "EventAction"("name");
