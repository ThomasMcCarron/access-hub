import { FindManyOptions, Repository } from 'typeorm';
import { ApiEntity } from '../entity';

/*
 * Shared service for the entity repository methods that don't require a specific ID type
 * */
export class ApiEntityService<
  ID extends string | number,
  T extends ApiEntity<ID>
> {
  constructor(protected readonly repository: Repository<T>) {}

  public async count(): Promise<number> {
    return this.repository.count();
  }

  public async findPage(pageNumber: number, pageSize: number): Promise<T[]> {
    return this.repository.find({
      take: pageSize,
      skip: pageNumber * pageSize,
    });
  }

  public async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  public async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  public async countByCriteria(options: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  public async searchByCriteria(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }
}
