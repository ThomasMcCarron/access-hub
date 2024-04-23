import { Component } from '@angular/core';
import { AdminControlBarComponent } from '../../../shared/admin-control-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IPlatform } from '@access-hub/api-interfaces';
import { PlatformService } from '../../../shared/entity-services/platform.service';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AdminEntityListBaseComponent } from '../../../shared/admin-entity-list-base/admin-entity-list-base.component';

@Component({
  selector: 'app-admin-platform',
  standalone: true,
  imports: [
    AdminControlBarComponent,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBar,
    AsyncPipe,
    MatIcon,
    DatePipe
  ],
  templateUrl: './platform.component.html'
})
export class PlatformComponent extends AdminEntityListBaseComponent<number, IPlatform> {
  pageSize = 10;

  constructor(protected override service: PlatformService,
              private readonly dialog: MatDialog
  ) {
    super(service);
  }

  setDisplayedColumns(): string[] {
    return ['id', 'name', 'createdAt'];
  }

}
