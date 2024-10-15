import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectDocuments1728996585442 implements MigrationInterface {
    name = 'ProjectDocuments1728996585442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "documents" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "documents"`);
    }

}
