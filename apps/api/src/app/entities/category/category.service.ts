import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IntApiEntityService } from '@access-hub/nest-orm-util';
import { Category } from './category.entity';

@Injectable()
export class CategoryService extends IntApiEntityService<Category> {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @InjectRepository(Category) override repository: Repository<Category>,
    protected config: ConfigService
  ) {
    super(repository);
  }
}
