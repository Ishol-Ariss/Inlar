-- AlterTable
ALTER TABLE `donator` ADD COLUMN `CRE_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UPD_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);