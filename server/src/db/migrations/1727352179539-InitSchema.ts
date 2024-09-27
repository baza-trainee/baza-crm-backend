import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1727352179539 implements MigrationInterface {
    name = 'InitSchema1727352179539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_request" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "linkedin" character varying NOT NULL, "specialization" character varying NOT NULL, "discord" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "phone" character varying NOT NULL, "isAccepted" boolean, "expired_At" TIMESTAMP, "created_at" TIMESTAMP, CONSTRAINT "UQ_39903abc43b66cda3d494f595b9" UNIQUE ("email"), CONSTRAINT "PK_5a8702f28aa636f59038532bb85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."project_aplication_state_enum" AS ENUM('accepted', 'declined', 'waiting')`);
        await queryRunner.query(`CREATE TABLE "project_aplication" ("id" SERIAL NOT NULL, "projectId" integer NOT NULL, "tagId" integer NOT NULL, "userId" integer NOT NULL, "state" "public"."project_aplication_state_enum" NOT NULL DEFAULT 'waiting', CONSTRAINT "PK_6136ae1b54f4f8ac72ee2326445" PRIMARY KEY ("id", "projectId", "tagId", "userId"))`);
        await queryRunner.query(`CREATE TABLE "project_member" ("projectId" integer NOT NULL, "tagId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_6531dcbf280d29045a85ae79256" PRIMARY KEY ("projectId", "tagId", "userId"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "projectPoints" integer NOT NULL, "projectStatus" character varying NOT NULL DEFAULT 'searching', "projectType" character varying NOT NULL DEFAULT 'free', "price" integer, "dateStart" character varying, "dateTeam" character varying, "links" text array, CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_requirment" ("projectId" integer NOT NULL, "tagId" integer NOT NULL, "count" integer NOT NULL, CONSTRAINT "PK_7191b2490f3443e82a31ff6576f" PRIMARY KEY ("projectId", "tagId"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying, "isSpecialization" boolean NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "linkedin" character varying NOT NULL, "discord" character varying, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phone" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "discordReceiving" boolean NOT NULL DEFAULT true, "status" character varying NOT NULL DEFAULT 'active', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."otp_otp_type_enum" AS ENUM('changePassword', 'discord')`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "otp_type" "public"."otp_otp_type_enum" NOT NULL, "expires_at" TIMESTAMP NOT NULL, "code" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "complaint" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" text NOT NULL, "isChecked" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_a9c8dbc2ab4988edcc2ff0a7337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_technologies_tag" ("userId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_076258eaea43b147c5da191599f" PRIMARY KEY ("userId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4a35f201eed42ca1bbab067a3d" ON "user_technologies_tag" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_90978e2550451739f0b681320d" ON "user_technologies_tag" ("tagId") `);
        await queryRunner.query(`CREATE TABLE "user_specializations_tag" ("userId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_fe5b7e0e61a6cd5a7b37cda3ca3" PRIMARY KEY ("userId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_75f06228571ef6b08fa3805a8d" ON "user_specializations_tag" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_281d18727c978721c9c4a378d5" ON "user_specializations_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "project_aplication" ADD CONSTRAINT "FK_4420a4788a23812d1fddba958eb" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_aplication" ADD CONSTRAINT "FK_4a929c1e3abcad59480287faea9" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_aplication" ADD CONSTRAINT "FK_8cf57251d995816afaf7c3d0941" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_member" ADD CONSTRAINT "FK_7115f82a61e31ac95b2681d83e4" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_member" ADD CONSTRAINT "FK_76144bd785096518fe64b5691d7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_member" ADD CONSTRAINT "FK_e7520163dafa7c1104fd672caad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_requirment" ADD CONSTRAINT "FK_d5adc384cc3c2e52ea89d60e45c" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_requirment" ADD CONSTRAINT "FK_fffb3a7a07d914566640858da2f" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complaint" ADD CONSTRAINT "FK_52dc113dcddfae564f99848c8af" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_technologies_tag" ADD CONSTRAINT "FK_4a35f201eed42ca1bbab067a3d5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_technologies_tag" ADD CONSTRAINT "FK_90978e2550451739f0b681320d7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_specializations_tag" ADD CONSTRAINT "FK_75f06228571ef6b08fa3805a8d4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_specializations_tag" ADD CONSTRAINT "FK_281d18727c978721c9c4a378d5d" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_specializations_tag" DROP CONSTRAINT "FK_281d18727c978721c9c4a378d5d"`);
        await queryRunner.query(`ALTER TABLE "user_specializations_tag" DROP CONSTRAINT "FK_75f06228571ef6b08fa3805a8d4"`);
        await queryRunner.query(`ALTER TABLE "user_technologies_tag" DROP CONSTRAINT "FK_90978e2550451739f0b681320d7"`);
        await queryRunner.query(`ALTER TABLE "user_technologies_tag" DROP CONSTRAINT "FK_4a35f201eed42ca1bbab067a3d5"`);
        await queryRunner.query(`ALTER TABLE "complaint" DROP CONSTRAINT "FK_52dc113dcddfae564f99848c8af"`);
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "FK_db724db1bc3d94ad5ba38518433"`);
        await queryRunner.query(`ALTER TABLE "project_requirment" DROP CONSTRAINT "FK_fffb3a7a07d914566640858da2f"`);
        await queryRunner.query(`ALTER TABLE "project_requirment" DROP CONSTRAINT "FK_d5adc384cc3c2e52ea89d60e45c"`);
        await queryRunner.query(`ALTER TABLE "project_member" DROP CONSTRAINT "FK_e7520163dafa7c1104fd672caad"`);
        await queryRunner.query(`ALTER TABLE "project_member" DROP CONSTRAINT "FK_76144bd785096518fe64b5691d7"`);
        await queryRunner.query(`ALTER TABLE "project_member" DROP CONSTRAINT "FK_7115f82a61e31ac95b2681d83e4"`);
        await queryRunner.query(`ALTER TABLE "project_aplication" DROP CONSTRAINT "FK_8cf57251d995816afaf7c3d0941"`);
        await queryRunner.query(`ALTER TABLE "project_aplication" DROP CONSTRAINT "FK_4a929c1e3abcad59480287faea9"`);
        await queryRunner.query(`ALTER TABLE "project_aplication" DROP CONSTRAINT "FK_4420a4788a23812d1fddba958eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_281d18727c978721c9c4a378d5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_75f06228571ef6b08fa3805a8d"`);
        await queryRunner.query(`DROP TABLE "user_specializations_tag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90978e2550451739f0b681320d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a35f201eed42ca1bbab067a3d"`);
        await queryRunner.query(`DROP TABLE "user_technologies_tag"`);
        await queryRunner.query(`DROP TABLE "complaint"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TYPE "public"."otp_otp_type_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "project_requirment"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "project_member"`);
        await queryRunner.query(`DROP TABLE "project_aplication"`);
        await queryRunner.query(`DROP TYPE "public"."project_aplication_state_enum"`);
        await queryRunner.query(`DROP TABLE "user_request"`);
    }

}
