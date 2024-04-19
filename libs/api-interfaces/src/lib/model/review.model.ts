import { IEntity } from '@access-hub/shared-orm-util';
import { IApp } from './app.model';
import { IUser } from './user.model';

export interface IReview extends IEntity<string> {
  app: IApp;
  rating: number;
  comment: string;
  createdBy: IUser;
}
