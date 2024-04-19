import { Role } from '../enum';
import { IEntity } from '@access-hub/shared-orm-util';

export interface IUser extends IEntity<string> {
  firstName?: string;
  lastName?: string;
  email?: string;
  verified?: boolean;
  role?: Role;
}
