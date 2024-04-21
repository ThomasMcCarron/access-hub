import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { PrimaryGeneratedUuidEntity } from '@access-hub/nest-orm-util';
import { IDeveloper } from '@access-hub/api-interfaces';
import { User } from '../user/user.entity';

/*
* TODO
* The developer(s) of an app
* */
@Entity()
export class Developer extends PrimaryGeneratedUuidEntity implements IDeveloper {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  url: string;

  @ManyToMany(() => User, (user) => user.developerOf)
  @JoinTable()
  users: User[];
}
