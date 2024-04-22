import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IntApiEntityService } from '@access-hub/nest-orm-util';
import { Platform } from './platform.entity';

@Injectable()
export class PlatformService extends IntApiEntityService<Platform> {
  private readonly logger = new Logger(PlatformService.name);

  constructor(
    @InjectRepository(Platform) override repository: Repository<Platform>,
    protected config: ConfigService
  ) {
    super(repository);
  }
}
