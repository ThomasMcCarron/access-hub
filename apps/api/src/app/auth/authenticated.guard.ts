import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Session } from '@ory/client';
import { UserService } from '../entities/user/user.service';
import { AxiosResponse } from 'axios';
import { IUser } from '@access-hub/api-interfaces';
import { getUserFromSession } from './auth.util';
import { InjectOryClient, OryClient } from '@access-hub/nest-ory-client';


@Injectable()
export class AuthenticatedGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticatedGuard.name);

  constructor(
    @InjectOryClient() private readonly ory: OryClient,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session: Session | null = await this.ory.frontend
      .toSession({ cookie: request.headers['cookie'] })
      .then((result: AxiosResponse<Session>) => {
        request.userId = result.data.identity.id;
        return result.data;
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          throw new HttpException(
            {
              status: HttpStatus.UNAUTHORIZED,
              error: 'error.sessionNotFound',
            },
            HttpStatus.UNAUTHORIZED
          );
        }
        this.logger.error('Error Getting Session', e.response.status);
        return null;
      });
    if (session) {
      await this.saveOrUpdateUserFromSession(session);
    } else {
      return false;
    }

    return session?.active;
  }

  private async saveOrUpdateUserFromSession(session: Session): Promise<IUser> {
    const userDetails: IUser = await getUserFromSession(session).catch((e) => {
      this.logger.error(`Error retrieving user details from Session`, e);
      return undefined;
    });
    if (userDetails) {
      return this.userService.saveFromSession(userDetails);
    }
  }
}
