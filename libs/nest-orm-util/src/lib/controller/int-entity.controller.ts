import { IApiEntityService } from '../service';
import { BaseEntityController } from './base-entity.controller';
import {
  Body,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Put, Query
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { PrimaryIntEntity } from '../entity';

export class IntEntityController<
  T extends PrimaryIntEntity
> extends BaseEntityController<number, T> {
  constructor(
    protected override readonly baseService: IApiEntityService<number, T>,
    protected override readonly logger: Logger,
    protected override readonly entityName: string
  ) {
    super(baseService, logger, entityName);
  }

  @Get('admin/count')
  async count(): Promise<number> {
    this.logger.log(`Getting ${this.entityName} count`);
    return this.baseService.count();
  }

  @Get('admin/page')
  async findPage(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number
  ): Promise<T[]> {
    this.logger.log(
      `Finding page of ${this.entityName}, #${pageNumber} size ${pageSize}`
    );
    return this.baseService.findPage(+pageNumber, +pageSize);
  }

  @Get('admin/all')
  async findAll(): Promise<T[]> {
    this.logger.log(`Finding all ${this.entityName}`);
    return this.baseService.findAll();
  }

  @Put('admin/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entity: T
  ): Promise<UpdateResult> {
    this.logger.log(`Updating ${this.entityName} ${id}: ${entity}`);
    return this.baseService.update(id, entity);
  }

  @Get('admin/:id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<T | null> {
    this.logger.log(`Finding ${this.entityName} ${id}`);
    return this.baseService.findOneById(id);
  }

  @Delete('admin/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
    this.logger.log(`Deleting ${this.entityName} ${id}`);
    return this.baseService.remove(id);
  }
}
