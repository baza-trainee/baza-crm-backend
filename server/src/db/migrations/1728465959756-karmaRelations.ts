import { MigrationInterface, QueryRunner } from "typeorm";

export class KarmaRelations1728465959756 implements MigrationInterface {
    name = 'KarmaRelations1728465959756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "karma" ("projectId" integer NOT NULL, "karmaGiverId" integer NOT NULL, "karmaReceiverId" integer NOT NULL, "points" integer NOT NULL, CONSTRAINT "PK_33045c0cf99e47311d3600b1b9b" PRIMARY KEY ("projectId", "karmaGiverId", "karmaReceiverId"))`);
        await queryRunner.query(`ALTER TABLE "karma" ADD CONSTRAINT "FK_2b941d0fe4e031084ab1a5b34e9" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karma" ADD CONSTRAINT "FK_a739abf5aab9b0a736638120dd9" FOREIGN KEY ("karmaGiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karma" ADD CONSTRAINT "FK_0f000123b4bea752f2f2e732937" FOREIGN KEY ("karmaReceiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "karma" DROP CONSTRAINT "FK_0f000123b4bea752f2f2e732937"`);
        await queryRunner.query(`ALTER TABLE "karma" DROP CONSTRAINT "FK_a739abf5aab9b0a736638120dd9"`);
        await queryRunner.query(`ALTER TABLE "karma" DROP CONSTRAINT "FK_2b941d0fe4e031084ab1a5b34e9"`);
        await queryRunner.query(`DROP TABLE "karma"`);
    }

}
