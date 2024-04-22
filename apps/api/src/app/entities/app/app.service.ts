import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App } from './app.entity';
import { UuidApiEntityService } from '@access-hub/nest-orm-util';

@Injectable()
export class AppService extends UuidApiEntityService<App> {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(App) override repository: Repository<App>,
    protected config: ConfigService
  ) {
    super(repository);
  }
}
