import { MigrationInterface, QueryRunner } from "typeorm";
import { Platform } from '../../app/entities/platform/platform.entity';
import { CATEGORIES, PLATFORMS } from '@access-hub/api-interfaces';
import { Category } from '../../app/entities/category/category.entity';

export class InsertDefaultData1713908121707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager.getRepository(Platform).save(PLATFORMS);
      await queryRunner.manager.getRepository(Category).save(CATEGORIES);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager.getRepository(Platform).delete(PLATFORMS.map((platform) => platform.id));
      await queryRunner.manager.getRepository(Category).delete(CATEGORIES.map((category) => category.id));
    }

}
