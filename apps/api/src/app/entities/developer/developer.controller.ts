import { Controller, Logger } from '@nestjs/common';
import { Developer } from './developer.entity';
import { UuidEntityController } from '@access-hub/nest-orm-util';
import { DeveloperService } from './developer.service';

@Controller('developers')
export class DeveloperController extends UuidEntityController<Developer> {
  constructor(private readonly developerService: DeveloperService) {
    super(developerService, new Logger(DeveloperController.name), 'developer');
  }
}
