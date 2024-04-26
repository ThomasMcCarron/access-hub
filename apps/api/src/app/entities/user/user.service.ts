import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UuidApiEntityService } from '@access-hub/nest-orm-util';
import { User } from './user.entity';
import { IUser, Role } from '@access-hub/api-interfaces';
import { userDetailsNeedUpdating } from '../../auth/auth.util';

@Injectable()
export class UserService extends UuidApiEntityService<User> {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) override repository: Repository<User>,
    protected config: ConfigService
  ) {
    super(repository);
  }

  async devChangeRole(id: string, role: Role) {
    return await this.repository.save({ id: id, role: role });
  }

  async saveFromSession(userDetails: IUser): Promise<User> {
    this.logger.debug('user details: ' + JSON.stringify(userDetails))
    return this.repository
      .findOne({ where: { id: userDetails.id } })
      .then(async (user) => {
        if (user) {
          // User exists
          // Update if user if details are different
          if (userDetailsNeedUpdating(user, userDetails)) {
            this.logger.debug(`Updating userDetails: ${JSON.stringify(userDetails)}`);
            const updatedUser = await this.repository.save({ ...userDetails });

          }
          return user;
        } else {
          // New user, needs to be initialised
          return await this.initialiseNewUser(userDetails);
        }
      })
      .catch((e) => {
        this.logger.error(`Error when finding user '${userDetails.id}'`, e);
        throw new Error(`Encountered an error finding User ${userDetails.id}`);
      });
  }

  async initialiseNewUser(userDetails: IUser): Promise<User> {
    const savedUser: User = await this.repository.save({
      ...userDetails
    });
    this.logger.debug(`Created user: ${JSON.stringify(savedUser)}`);
    return savedUser;
  }

}
