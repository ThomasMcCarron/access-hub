import { Controller, Logger } from '@nestjs/common';
import { App } from './app.entity';
import { UuidEntityController } from '@access-hub/nest-orm-util';
import { AppService } from './app.service';

@Controller('apps')
export class AppController extends UuidEntityController<App> {
  constructor(private readonly appService: AppService) {
    super(appService, new Logger(AppController.name), 'app');
  }
}
