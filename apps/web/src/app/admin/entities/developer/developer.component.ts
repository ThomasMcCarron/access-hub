import { Component } from '@angular/core';
import { AdminControlBarComponent } from '../../../shared/admin-control-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IDeveloper } from '@access-hub/api-interfaces';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AdminEntityListBaseComponent } from '../../../shared/admin-entity-list-base/admin-entity-list-base.component';
import { DeveloperService } from '../../../shared/entity-services/developer.service';

@Component({
  selector: 'app-admin-developer',
  standalone: true,
  imports: [
    AdminControlBarComponent,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBar,
    AsyncPipe,
    MatIcon
  ],
  templateUrl: './developer.component.html'
})
export class DeveloperComponent extends AdminEntityListBaseComponent<string, IDeveloper> {
  pageSize = 10;

  constructor(protected override service: DeveloperService) {
    super(service);
  }

  setDisplayedColumns(): string[] {
    return ['id', 'name', 'createdAt'];
  }

  createNew() {
    console.error('todo')
  }
}
