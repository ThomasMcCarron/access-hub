import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

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
      ],
      migrations: [
      ],
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: true,
      keepConnectionAlive: true,
    };
  }
}
