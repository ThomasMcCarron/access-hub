import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '@access-hub/ngx-orm-util';
import { IUser } from '@access-hub/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService extends EntityService<string, IUser> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.baseUrl}/users`);
  }
}
