import { Body, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiEntity } from '../entity';
import { IApiEntityService } from '../service';
import { SearchCriteria } from '@access-hub/shared-orm-util';
import { searchCriteriaToFindOptions } from '../util';

// Provides a range of utility functions for Admins to manage a given entity
export class BaseEntityController<
  ID extends string | number,
  T extends ApiEntity<ID>
> {
  constructor(
    protected readonly baseService: IApiEntityService<ID, T>,
    protected readonly logger: Logger,
    protected readonly entityName: string
  ) {}

  @Post('admin')
  async save(@Body() entity: any): Promise<T> {
    this.logger.log(`Saving ${this.entityName} ${entity}`);
    return this.baseService.save(entity);
  }

  @Get('admin/count')
  async count(): Promise<number> {
    this.logger.log(`Getting ${this.entityName} count`);
    return this.baseService.count();
  }

  @Post('admin/criteria')
  async searchByCriteria(
    @Body() criteria: SearchCriteria<T>,
    @Query('count') count = false
  ): Promise<T[] | number> {
    this.logger.log(
      `${count ? 'Counting' : 'Searching'} ${this.entityName} by criteria`
    );
    const parsedCriteria = searchCriteriaToFindOptions(criteria);
    if (count) {
      return this.baseService.countByCriteria(parsedCriteria);
    }
    return this.baseService.searchByCriteria(parsedCriteria);
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
}
