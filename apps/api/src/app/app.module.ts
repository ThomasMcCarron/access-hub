import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath, validateEnvironmentConfig } from './environment/env.validation';
import { TypeormConfigService } from './config/typeorm-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

const envFilePath: string = getEnvPath(`${__dirname}/environments`);

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentConfig,
      envFilePath: envFilePath,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
