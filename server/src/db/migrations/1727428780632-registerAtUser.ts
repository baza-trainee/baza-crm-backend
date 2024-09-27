import { MigrationInterface, QueryRunner } from "typeorm";

export class RegisterAtUser1727428780632 implements MigrationInterface {
    name = 'RegisterAtUser1727428780632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "registerAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "registerAt"`);
    }

}
