import { PrimaryUuidEntity } from '../entity';
import { PrimaryGeneratedUuidEntity } from '../entity';
import { IApiEntityService } from '../service';
import { BaseEntityController } from './base-entity.controller';
import {
  Body,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';

export class UuidEntityController<
  T extends PrimaryUuidEntity | PrimaryGeneratedUuidEntity
> extends BaseEntityController<string, T> {
  constructor(
    protected override readonly baseService: IApiEntityService<string, T>,
    protected override readonly logger: Logger,
    protected override readonly entityName: string
  ) {
    super(baseService, logger, entityName);
  }

  @Put('admin/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() entity: T
  ): Promise<UpdateResult> {
    this.logger.log(`Updating ${this.entityName} ${id}: ${entity}`);
    return this.baseService.update(id, entity);
  }

  @Get('admin/:id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string): Promise<T | null> {
    this.logger.log(`Finding ${this.entityName} ${id}`);
    return this.baseService.findOneById(id);
  }

  @Delete('admin/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<UpdateResult> {
    this.logger.log(`Deleting ${this.entityName} ${id}`);
    return this.baseService.remove(id);
  }
}
