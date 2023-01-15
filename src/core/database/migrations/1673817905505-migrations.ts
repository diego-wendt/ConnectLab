import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1673817905505 implements MigrationInterface {
    name = 'migrations1673817905505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(50) NOT NULL, "number" character varying(6) NOT NULL, "neighborhood" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, "complement" character varying(50), "zipCode" character varying(8) NOT NULL, "user_id" uuid, CONSTRAINT "REL_35cd6c3fafec0bb5d072e24ea2" UNIQUE ("user_id"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "models" ("id_model" character varying NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "madeBy" character varying NOT NULL, "photoUrl" character varying NOT NULL, CONSTRAINT "PK_ade607f8f6d03c7b1b61e13ad62" PRIMARY KEY ("id_model"))`);
        await queryRunner.query(`CREATE TYPE "public"."devices_place_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "devices" ("id_device" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "virtual_id" character varying NOT NULL, "ip_address" character varying NOT NULL, "mac_address" character varying NOT NULL, "signal" character varying NOT NULL, "switch_state" boolean NOT NULL, "place" "public"."devices_place_enum" NOT NULL, "model_id" character varying, "user_devices" uuid, CONSTRAINT "PK_bcfc84a711e13677f369b6f246d" PRIMARY KEY ("id_device"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "url" character varying NOT NULL DEFAULT 'https://publicdomainvectors.org/photos/1389952697.png', "phone" character varying(11), "active" boolean NOT NULL, "salt" character varying NOT NULL, "password" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_9976b0a15b9a60e48466d2307b9" FOREIGN KEY ("model_id") REFERENCES "models"("id_model") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_bcfe3c041041dc309425a1507df" FOREIGN KEY ("user_devices") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_bcfe3c041041dc309425a1507df"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_9976b0a15b9a60e48466d2307b9"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "devices"`);
        await queryRunner.query(`DROP TYPE "public"."devices_place_enum"`);
        await queryRunner.query(`DROP TABLE "models"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
