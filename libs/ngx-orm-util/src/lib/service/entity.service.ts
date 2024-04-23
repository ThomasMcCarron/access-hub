import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEntityService } from './entity-service.interface';
import { DeleteResult } from 'typeorm';
import { IEntity, SearchCriteria } from '@access-hub/shared-orm-util';

export abstract class EntityService<ID extends string | number, T extends IEntity<ID>>
  implements IEntityService<ID, T> {

  protected constructor(protected http: HttpClient, protected baseUrl: string) {}

  create(t: T): Observable<HttpResponse<T>> {
    return this.http.post<T>(`${this.baseUrl}/admin`, t, { observe: 'response' });
  }

  update(entity: T): Observable<HttpResponse<any>> {
    if (!entity.id) {
      throw new Error('error.updateEntity.falsyEntityId');
    }
    return this.http.put<T>(`${this.baseUrl}/admin/${entity.id}`, entity, { observe: 'response' });
  }

  count(): Observable<HttpResponse<number>> {
    return this.http.get<number>(`${this.baseUrl}/admin/count`, { observe: 'response' });
  }

  findOneById(id: ID): Observable<HttpResponse<T | undefined>> {
    return this.http.get<T>(`${this.baseUrl}/admin/${id}`, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<T[]>> {
    return this.http.get<T[]>(`${this.baseUrl}/admin/all`, { observe: 'response' });
  }

  findPage(pageNumber: number, pageSize: number): Observable<HttpResponse<T[]>> {
    return this.http.get<T[]>(`${this.baseUrl}/admin/page`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      },
      observe: 'response'
    });
  }

  delete(id: ID): Observable<HttpResponse<DeleteResult>> {
    return this.http.delete<DeleteResult>(`${this.baseUrl}/admin/${id}`, { observe: 'response' });
  }

  searchByCriteria(criteria: SearchCriteria<T>): Observable<HttpResponse<T[]>> {
    return this.http.post<T[]>(`${this.baseUrl}/admin/criteria`, criteria, { observe: 'response' });
  }

  countByCriteria(criteria: SearchCriteria<T>): Observable<HttpResponse<number>> {
    return this.http.post<number>(`${this.baseUrl}/admin/criteria`, criteria, {
      observe: 'response',
      params: { count: true }
    });
  }
}
