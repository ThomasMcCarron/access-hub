import { IsDefined, IsEnum, IsNumber, IsString, MinLength, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { resolve } from 'path';
import { existsSync } from 'fs';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  /* App Config */
  ORIGIN_URL: string;

  @IsNumber()
  PORT?: number;

  /* Database Config*/
  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_HOST: string;
  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_NAME: string;
  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_USER: string;
  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_PASSWORD: string;
  @IsDefined()
  @IsNumber()
  DATABASE_PORT: number;

  @IsDefined()
  @IsString()
  @MinLength(1)
  ORY_CLIENT_URI: string;
  @IsDefined()
  @IsString()
  @MinLength(1)
  ORY_ACCESS_TOKEN: string;
  @IsDefined()
  @IsString()
  @MinLength(1)
  ORY_KETO_CHECK_URI: string;
  @IsDefined()
  @IsString()
  @MinLength(1)
  ORY_KETO_WRITE_URI: string;
}

export function validateEnvironmentConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : 'development.env';
  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }
  return filePath;
}
