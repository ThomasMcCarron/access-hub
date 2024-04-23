import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '@access-hub/ngx-orm-util';
import { IPlatform } from '@access-hub/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlatformService extends EntityService<number, IPlatform> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.baseUrl}/platforms`);
  }
}
