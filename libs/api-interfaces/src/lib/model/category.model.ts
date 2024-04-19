import { IEntity } from '@access-hub/shared-orm-util';

export interface ICategory extends IEntity<number> {
  name: string;
  description: string;
}
