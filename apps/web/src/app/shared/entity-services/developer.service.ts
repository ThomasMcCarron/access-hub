import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '@access-hub/ngx-orm-util';
import { IDeveloper } from '@access-hub/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DeveloperService extends EntityService<string, IDeveloper> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.baseUrl}/developers`);
  }
}
