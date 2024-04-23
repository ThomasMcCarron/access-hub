import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '@access-hub/ngx-orm-util';
import { IApp } from '@access-hub/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppService extends EntityService<string, IApp> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.baseUrl}/apps`);
  }

}
