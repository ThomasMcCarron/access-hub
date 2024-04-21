import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedUuidEntity, PrimaryIntEntity } from '@access-hub/nest-orm-util';
import { IApp, IFeature, IPricingInfo } from '@access-hub/api-interfaces';
import { Developer } from '../developer/developer.entity';
import { Category } from '../category/category.entity';
import { Platform } from '../platform/platform.entity';
import { User } from '../user/user.entity';
import { Review } from '../review/review.entity';

export class PricingInfo implements IPricingInfo {
  @Column({ nullable: false, default: 0 })
  price: number;

  @Column({ nullable: false, default: false })
  hasSubscription: boolean;
}

@Entity()
export class App extends PrimaryGeneratedUuidEntity implements IApp {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  address?: string;

  @OneToMany(() => Feature, (feature) => feature.ofApp)
  features: Feature[];

  @ManyToMany(() => Category, (category) => category.apps)
  categories: Category[];

  @ManyToMany(() => Developer)
  developer?: Developer;

  @ManyToOne(() => User, (user) => user.listedApps)
  listedBy: User;

  // TODO: Determine if platforms & platform links should be treated separately
  platformLinks: Map<number, string>;

  @ManyToMany(() => Platform)
  @JoinTable()
  platforms: Platform[];

  @Column(() => PricingInfo)
  pricing: PricingInfo;

  @OneToMany(() => Review, (review) => review.app)
  reviews: Review[];
}

@Entity()
export class Feature extends PrimaryIntEntity implements IFeature {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => App, (app) => app.features)
  ofApp: App;
}
