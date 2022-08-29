-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `actor_id` VARCHAR(191) NOT NULL,
    `actor_name` VARCHAR(191) NOT NULL,
    `group` VARCHAR(191) NOT NULL,
    `action_id` VARCHAR(191) NOT NULL,
    `target_id` VARCHAR(191) NOT NULL,
    `target_name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `occured_at` DATETIME(3) NOT NULL,
    `metadata` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventAction` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EventAction_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
