import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectDocumentsDefault1728997759375 implements MigrationInterface {
    name = 'ProjectDocumentsDefault1728997759375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "documents" SET DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "documents" DROP DEFAULT`);
    }

}
