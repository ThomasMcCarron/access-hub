import { IEntity } from '@access-hub/shared-orm-util';

export interface IApp extends IEntity<string> {

}

export interface IFeature {
  name: string;
  description: string;
}
