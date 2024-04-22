import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UuidApiEntityService } from '@access-hub/nest-orm-util';
import { User } from './user.entity';

@Injectable()
export class UserService extends UuidApiEntityService<User> {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) override repository: Repository<User>,
    protected config: ConfigService
  ) {
    super(repository);
  }
}
