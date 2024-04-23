import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { DeleteResult } from 'typeorm';
import { IEntity, SearchCriteria } from '@access-hub/shared-orm-util';

export interface IEntityService<ID extends string | number, T extends IEntity<ID>> {
  create(t: T): Observable<HttpResponse<T>>;

  update(entity: T): Observable<HttpResponse<T>>;

  count(): Observable<HttpResponse<number>>;

  findPage(pageNumber: number, pageSize: number): Observable<HttpResponse<T[]>>;

  findOneById(id: ID): Observable<HttpResponse<T | undefined>>;

  findAll(): Observable<HttpResponse<T[]>>;

  delete(id: ID): Observable<HttpResponse<DeleteResult>>;

  searchByCriteria(criteria: SearchCriteria<T>): Observable<HttpResponse<T[]>>;

  countByCriteria(criteria: SearchCriteria<T>): Observable<HttpResponse<number>>;
}
