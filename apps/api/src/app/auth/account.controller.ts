import { Controller, Get, Logger, NotFoundException, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../entities/user/user.service';
import { IUser, Role } from '@access-hub/api-interfaces';
import { User } from '../entities/user/user.entity';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('account')
export class AccountController {
  private logger = new Logger(AccountController.name);

  constructor(private readonly userService: UserService) {}

  entityName = 'user';

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  public async getUser(@Param('id', ParseUUIDPipe) userId: string): Promise<IUser> {
    this.logger.log(`Retrieving user ${userId}`);
    return await this.userService.findOneById(userId);
  }

  @Get(':id/role')
  @UseGuards(AuthenticatedGuard)
  public async devChangeRole(@Param('id') userId: string, @Query('role') role: Role): Promise<User> {
    if (process.env.NODE_ENV !== 'development') {
      throw new NotFoundException();
    }
    this.logger.log(`Setting ${userId} role ${role}`);
    await this.userService.devChangeRole(userId, role);
    return this.userService.findOneById(userId);
  }
}
