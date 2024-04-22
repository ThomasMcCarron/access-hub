import { Controller, Logger } from '@nestjs/common';
import { Review } from './review.entity';
import { UuidEntityController } from '@access-hub/nest-orm-util';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController extends UuidEntityController<Review> {
  constructor(private readonly reviewService: ReviewService) {
    super(reviewService, new Logger(ReviewController.name), 'review');
  }
}
