import { FindManyOptions, UpdateResult } from 'typeorm';
import { ApiEntity } from '../entity';

export interface IApiEntityService<
  ID extends string | number,
  T extends ApiEntity<ID>
> {
  save(entity: T): Promise<T>;

  update(id: ID, entity: T): Promise<UpdateResult>;

  count(): Promise<number>;

  findOneById(id: ID): Promise<T | null>;

  findAll(): Promise<T[]>;

  findPage(pageNumber: number, pageSize: number): Promise<T[]>;

  remove(id: ID): Promise<UpdateResult>;

  countByCriteria(criteria: FindManyOptions<T>): Promise<number>;

  searchByCriteria(criteria: FindManyOptions<T>): Promise<T[]>;
}
