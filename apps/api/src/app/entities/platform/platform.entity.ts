import { Column, Entity } from 'typeorm';
import { PrimaryIntEntity } from '@access-hub/nest-orm-util';
import { IPlatform } from '@access-hub/api-interfaces';

@Entity()
export class Platform extends PrimaryIntEntity implements IPlatform {
  @Column({ nullable: false })
  name: string;
}
