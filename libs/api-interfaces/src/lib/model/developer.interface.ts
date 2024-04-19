import { IEntity } from '@access-hub/shared-orm-util';
import { IUser } from './user.model';

export interface IDeveloper extends IEntity<string> {
  name: string;
  users: IUser[];
  url: string;
}
