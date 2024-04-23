import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { App, Feature } from '../entities/app/app.entity';
import { Category } from '../entities/category/category.entity';
import { Developer } from '../entities/developer/developer.entity';
import { Platform } from '../entities/platform/platform.entity';
import { Review } from '../entities/review/review.entity';
import { User } from '../entities/user/user.entity';
import { InitialiseDatabase1713739122870 } from '../../migrations/migration';
import { InsertDefaultData1713908121707 } from '../../migrations/migration/1713908121707-InsertDefaultData';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  private readonly logger = new Logger(TypeormConfigService.name);

  @Inject(ConfigService) private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    this.logger.log(
      `Database: ${this.config.get<string>('DATABASE_HOST')}:${this.config.get<number>(
        'DATABASE_PORT'
      )}/${this.config.get<string>('DATABASE_NAME')}`
    );
    return {
      type: 'postgres',
      host: this.config.get<string>('DATABASE_HOST'),
      port: +this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      entities: [
        App,
        Feature,
        Category,
        Developer,
        Platform,
        Review,
        User
      ],
      migrations: [
        InitialiseDatabase1713739122870,
        InsertDefaultData1713908121707
      ],
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: true,
      keepConnectionAlive: true,
    };
  }
}
