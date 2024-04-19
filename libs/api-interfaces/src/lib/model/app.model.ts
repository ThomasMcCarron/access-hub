import { IEntity } from '@access-hub/shared-orm-util';
import { IDeveloper } from './developer.interface';
import { IReview } from './review.model';
import { ICategory } from './category.model';
import { IUser } from './user.model';
import { IPlatform } from './platform.model';

export interface IApp extends IEntity<string> {
  name: string;
  description: string;
  url: string;
  pricing: IPricingInfo;
  developer: IDeveloper;
  platforms: IPlatform[];
  platformLinks: Map<number, string>;
  features: IFeature[];
  reviews: IReview[];
  categories: ICategory[];
  listedBy: IUser;
}

export interface IFeature {
  name: string;
  description: string;
}

export interface IPricingInfo {
  price: number;
  hasSubscription: boolean;
}
