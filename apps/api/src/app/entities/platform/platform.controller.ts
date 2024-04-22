import { Controller, Logger } from '@nestjs/common';
import { IntEntityController } from '@access-hub/nest-orm-util';
import { PlatformService } from './platform.service';
import { Platform } from './platform.entity';

@Controller('platforms')
export class PlatformController extends IntEntityController<Platform> {
  constructor(private readonly categoryService: PlatformService) {
    super(categoryService, new Logger(PlatformController.name), 'category');
  }
}
