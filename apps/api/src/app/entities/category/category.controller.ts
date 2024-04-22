import { Controller, Logger } from '@nestjs/common';
import { IntEntityController } from '@access-hub/nest-orm-util';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController extends IntEntityController<Category> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService, new Logger(CategoryController.name), 'category');
  }
}
