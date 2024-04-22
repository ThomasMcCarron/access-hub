import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UuidApiEntityService } from '@access-hub/nest-orm-util';
import { Developer } from './developer.entity';

@Injectable()
export class DeveloperService extends UuidApiEntityService<Developer> {
  private readonly logger = new Logger(DeveloperService.name);

  constructor(
    @InjectRepository(Developer) override repository: Repository<Developer>,
    protected config: ConfigService
  ) {
    super(repository);
  }
}
