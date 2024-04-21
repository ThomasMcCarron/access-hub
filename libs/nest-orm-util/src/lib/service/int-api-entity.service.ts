import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { PrimaryIntEntity } from '../entity';
import { ApiEntityService } from './api-entity.service';
import { IApiEntityService } from './api-entity-service.interface';

/*
 * Base Service for entities with a number ID
 * */
@Injectable()
export class IntApiEntityService<T extends PrimaryIntEntity>
  extends ApiEntityService<number, T>
  implements IApiEntityService<number, T>
{
  constructor(override readonly repository: Repository<T>) {
    super(repository);
  }

  public async findOneById(id: number): Promise<T | null> {
    const findOptions = { id: id } as FindOptionsWhere<T>;
    return this.repository.findOneBy(findOptions);
  }

  public async update(id: number, entity: T | any): Promise<UpdateResult> {
    return this.repository.update(id, entity);
  }

  public async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
}
