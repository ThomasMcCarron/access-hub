import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '@access-hub/ngx-orm-util';
import { IReview } from '@access-hub/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReviewService extends EntityService<string, IReview> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.baseUrl}/reviews`);
  }
}
