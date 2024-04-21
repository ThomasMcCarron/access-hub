import { Role } from '../enum';
import { IEntity } from '@access-hub/shared-orm-util';
import { IReview } from './review.model';
import { IApp } from './app.model';
import { IDeveloper } from './developer.interface';

export interface IUser extends IEntity<string> {
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  role: Role;
  reviews: IReview[];
  listedApps: IApp[];
  developerOf: IDeveloper[];
}
