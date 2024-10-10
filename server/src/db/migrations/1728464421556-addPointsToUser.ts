import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPointsToUser1728464421556 implements MigrationInterface {
    name = 'AddPointsToUser1728464421556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "projectPoints" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "karmaPoints" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "karmaPoints"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "projectPoints"`);
    }

}
