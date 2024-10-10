import { MigrationInterface, QueryRunner } from "typeorm";

export class OtpEnumAdd1728490493655 implements MigrationInterface {
    name = 'OtpEnumAdd1728490493655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."otp_otp_type_enum" RENAME TO "otp_otp_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."otp_otp_type_enum" AS ENUM('changePassword', 'discord', 'karma')`);
        await queryRunner.query(`ALTER TABLE "otp" ALTER COLUMN "otp_type" TYPE "public"."otp_otp_type_enum" USING "otp_type"::"text"::"public"."otp_otp_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."otp_otp_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."otp_otp_type_enum_old" AS ENUM('changePassword', 'discord')`);
        await queryRunner.query(`ALTER TABLE "otp" ALTER COLUMN "otp_type" TYPE "public"."otp_otp_type_enum_old" USING "otp_type"::"text"::"public"."otp_otp_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."otp_otp_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."otp_otp_type_enum_old" RENAME TO "otp_otp_type_enum"`);
    }

}
