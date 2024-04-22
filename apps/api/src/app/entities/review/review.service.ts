import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UuidApiEntityService } from '@access-hub/nest-orm-util';
import { Review } from './review.entity';

@Injectable()
export class ReviewService extends UuidApiEntityService<Review> {
  private readonly logger = new Logger(ReviewService.name);

  constructor(
    @InjectRepository(Review) override repository: Repository<Review>,
    protected config: ConfigService
  ) {
    super(repository);
  }
}
