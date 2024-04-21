import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { PrimaryUuidEntity } from '../entity';
import { PrimaryGeneratedUuidEntity } from '../entity';
import { ApiEntityService } from './api-entity.service';
import { IApiEntityService } from './api-entity-service.interface';

/*
 * Base Service for entities with a string ID
 * */
@Injectable()
export class UuidApiEntityService<
    T extends PrimaryUuidEntity | PrimaryGeneratedUuidEntity
  >
  extends ApiEntityService<string, T>
  implements IApiEntityService<string, T>
{
  constructor(override readonly repository: Repository<T>) {
    super(repository);
  }

  public async findOneById(id: string): Promise<T | null> {
    const findOptions = { id: id } as FindOptionsWhere<T>;
    return this.repository.findOneBy(findOptions);
  }

  public async update(id: string, entity: T | any): Promise<UpdateResult> {
    return this.repository.update(id, entity);
  }

  public async remove(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
}
