import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath, validateEnvironmentConfig } from './environment/env.validation';
import { TypeormConfigService } from './config/typeorm-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from './entities/entities.module';
import { AccountController } from './auth/account.controller';
import { OryConfigService } from './config/ory-config.service';
import { OryClientModule } from '@access-hub/nest-ory-client';

const envFilePath: string = getEnvPath(`${__dirname}/environments`);

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentConfig,
      envFilePath: envFilePath,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
    OryClientModule.forRootAsync({ useClass: OryConfigService }),
    EntitiesModule
  ],
  controllers: [
    AccountController
  ],
  providers: [],
})
export class AppModule {}
