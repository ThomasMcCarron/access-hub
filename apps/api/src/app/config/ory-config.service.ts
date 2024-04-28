import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OryClientOptions, OryClientOptionsFactory } from '@access-hub/nest-ory-client';

@Injectable()
export class OryConfigService implements OryClientOptionsFactory {
  @Inject(ConfigService) private readonly config: ConfigService;


  createOryClientOptions(): OryClientOptions {
    return {
      clientUri: this.config.get<string>('ORY_CLIENT_URI'),
      accessToken: this.config.get<string>('ORY_ACCESS_TOKEN'),
      ketoClient: 'grpc',
      ketoCheckUri: this.config.get<string>('ORY_KETO_CHECK_URI'),
      ketoWriteUri: this.config.get<string>('ORY_KETO_WRITE_URI'),
      ketoRetryCount: 5,
    };
  }
}
