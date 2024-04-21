import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { PrimaryIntEntity } from '@access-hub/nest-orm-util';
import { ICategory } from '@access-hub/api-interfaces';
import { App } from '../app/app.entity';

@Entity()
export class Category extends PrimaryIntEntity implements ICategory {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToMany(() => App, (app) => app.categories)
  @JoinTable()
  apps: App[];
}
