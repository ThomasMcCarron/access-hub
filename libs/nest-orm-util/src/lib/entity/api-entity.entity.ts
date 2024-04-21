import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { IEntity } from '@access-hub/shared-orm-util';

export abstract class ApiEntity<ID extends string | number> implements IEntity<ID> {
  id!: ID;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

}
