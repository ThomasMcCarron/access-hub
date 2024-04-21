import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedUuidEntity } from '@access-hub/nest-orm-util';
import { IReview } from '@access-hub/api-interfaces';
import { User } from '../user/user.entity';
import { App } from '../app/app.entity';

@Entity()
export class Review extends PrimaryGeneratedUuidEntity implements IReview {
  @ManyToOne(() => App, (app) => app.reviews)
  app: App;

  @Column({ nullable: false, type: "varchar", length: 20000 })
  comment: string;

  @Column({ nullable: false })
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  createdBy: User;
}
