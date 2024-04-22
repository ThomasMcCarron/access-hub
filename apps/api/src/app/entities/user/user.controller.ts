import { Controller, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UuidEntityController } from '@access-hub/nest-orm-util';
import { UserService } from './user.service';

@Controller('users')
export class UserController extends UuidEntityController<User> {
  constructor(private readonly userService: UserService) {
    super(userService, new Logger(UserController.name), 'user');
  }
}
