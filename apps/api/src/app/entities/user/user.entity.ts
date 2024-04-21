import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { PrimaryUuidEntity } from '@access-hub/nest-orm-util';
import { IUser, Role } from '@access-hub/api-interfaces';
import { Review } from '../review/review.entity';
import { App } from '../app/app.entity';
import { Developer } from '../developer/developer.entity';

@Entity()
export class User extends PrimaryUuidEntity implements IUser {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
    default: Role.USER
  })
  role: Role;

  @Column({ nullable: false })
  verified: boolean;

  @OneToMany(() => Review, (review) => review.createdBy,  { nullable: true })
  reviews: Review[];

  @OneToMany(() => App, (app) => app.listedBy)
  listedApps: App[];

  @ManyToMany(() => Developer, (developer) => developer.users)
  @JoinTable()
  developerOf: Developer[];
}
