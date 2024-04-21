import { IEntity } from '@access-hub/shared-orm-util';
import { IApp } from './app.model';

export interface ICategory extends IEntity<number> {
  name: string;
  description: string;
  apps?: IApp[];
}
