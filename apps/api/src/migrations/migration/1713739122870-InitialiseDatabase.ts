import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialiseDatabase1713739122870 implements MigrationInterface {
    name = 'InitialiseDatabase1713739122870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying(20000) NOT NULL, "rating" integer NOT NULL, "appId" uuid, "createdById" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('USER', 'ADMIN', 'ANONYMOUS')`);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', "verified" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "developer" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_71b846918f80786eed6bfb68b77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "platform" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c33d6abeebd214bd2850bfd6b8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "address" character varying NOT NULL, "listedById" uuid, "pricingPrice" integer NOT NULL DEFAULT '0', "pricingHassubscription" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9478629fc093d229df09e560aea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feature" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "ofAppId" uuid, CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_developer_of_developer" ("userId" uuid NOT NULL, "developerId" uuid NOT NULL, CONSTRAINT "PK_063945a833d4d2007bd0d753b49" PRIMARY KEY ("userId", "developerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3536b4813586b4fe666fc0554d" ON "user_developer_of_developer" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_10dd42e76beda5aacd471b9c6a" ON "user_developer_of_developer" ("developerId") `);
        await queryRunner.query(`CREATE TABLE "developer_users_user" ("developerId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_1b6a35bbc43a51a0ff100f1fb3b" PRIMARY KEY ("developerId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8c2d4738f856be3a1522a6800e" ON "developer_users_user" ("developerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef60de87540fa18fc514cb47f8" ON "developer_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "category_apps_app" ("categoryId" integer NOT NULL, "appId" uuid NOT NULL, CONSTRAINT "PK_c83bdce6d9d932492cac50790ba" PRIMARY KEY ("categoryId", "appId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37ca98aedddf1efa6574bd3866" ON "category_apps_app" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a9f7b36169b2789773e3daf661" ON "category_apps_app" ("appId") `);
        await queryRunner.query(`CREATE TABLE "app_platforms_platform" ("appId" uuid NOT NULL, "platformId" integer NOT NULL, CONSTRAINT "PK_666cb7b43b0cf02469688516195" PRIMARY KEY ("appId", "platformId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c3998242e7dc9c8cb35c1be308" ON "app_platforms_platform" ("appId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e2cceaf6e255230f82f60d9885" ON "app_platforms_platform" ("platformId") `);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2dae44f0b2ea3b38c58766b4e87" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_7f1febb5465b721169034ec247f" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app" ADD CONSTRAINT "FK_76b584f61da90c37fb20addf5d2" FOREIGN KEY ("listedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feature" ADD CONSTRAINT "FK_2f1957f7dc191dd3f5f6ea1c35f" FOREIGN KEY ("ofAppId") REFERENCES "app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_developer_of_developer" ADD CONSTRAINT "FK_3536b4813586b4fe666fc0554da" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_developer_of_developer" ADD CONSTRAINT "FK_10dd42e76beda5aacd471b9c6a8" FOREIGN KEY ("developerId") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "developer_users_user" ADD CONSTRAINT "FK_8c2d4738f856be3a1522a6800ec" FOREIGN KEY ("developerId") REFERENCES "developer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "developer_users_user" ADD CONSTRAINT "FK_ef60de87540fa18fc514cb47f8c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_apps_app" ADD CONSTRAINT "FK_37ca98aedddf1efa6574bd38664" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_apps_app" ADD CONSTRAINT "FK_a9f7b36169b2789773e3daf6610" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_platforms_platform" ADD CONSTRAINT "FK_c3998242e7dc9c8cb35c1be3088" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_platforms_platform" ADD CONSTRAINT "FK_e2cceaf6e255230f82f60d9885d" FOREIGN KEY ("platformId") REFERENCES "platform"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_platforms_platform" DROP CONSTRAINT "FK_e2cceaf6e255230f82f60d9885d"`);
        await queryRunner.query(`ALTER TABLE "app_platforms_platform" DROP CONSTRAINT "FK_c3998242e7dc9c8cb35c1be3088"`);
        await queryRunner.query(`ALTER TABLE "category_apps_app" DROP CONSTRAINT "FK_a9f7b36169b2789773e3daf6610"`);
        await queryRunner.query(`ALTER TABLE "category_apps_app" DROP CONSTRAINT "FK_37ca98aedddf1efa6574bd38664"`);
        await queryRunner.query(`ALTER TABLE "developer_users_user" DROP CONSTRAINT "FK_ef60de87540fa18fc514cb47f8c"`);
        await queryRunner.query(`ALTER TABLE "developer_users_user" DROP CONSTRAINT "FK_8c2d4738f856be3a1522a6800ec"`);
        await queryRunner.query(`ALTER TABLE "user_developer_of_developer" DROP CONSTRAINT "FK_10dd42e76beda5aacd471b9c6a8"`);
        await queryRunner.query(`ALTER TABLE "user_developer_of_developer" DROP CONSTRAINT "FK_3536b4813586b4fe666fc0554da"`);
        await queryRunner.query(`ALTER TABLE "feature" DROP CONSTRAINT "FK_2f1957f7dc191dd3f5f6ea1c35f"`);
        await queryRunner.query(`ALTER TABLE "app" DROP CONSTRAINT "FK_76b584f61da90c37fb20addf5d2"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_7f1febb5465b721169034ec247f"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2dae44f0b2ea3b38c58766b4e87"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2cceaf6e255230f82f60d9885"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3998242e7dc9c8cb35c1be308"`);
        await queryRunner.query(`DROP TABLE "app_platforms_platform"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9f7b36169b2789773e3daf661"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37ca98aedddf1efa6574bd3866"`);
        await queryRunner.query(`DROP TABLE "category_apps_app"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef60de87540fa18fc514cb47f8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c2d4738f856be3a1522a6800e"`);
        await queryRunner.query(`DROP TABLE "developer_users_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10dd42e76beda5aacd471b9c6a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3536b4813586b4fe666fc0554d"`);
        await queryRunner.query(`DROP TABLE "user_developer_of_developer"`);
        await queryRunner.query(`DROP TABLE "feature"`);
        await queryRunner.query(`DROP TABLE "app"`);
        await queryRunner.query(`DROP TABLE "platform"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "developer"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
