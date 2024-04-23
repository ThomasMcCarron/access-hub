import { Component } from '@angular/core';
import { AdminControlBarComponent } from '../../../shared/admin-control-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IDeveloper, IReview } from '@access-hub/api-interfaces';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AdminEntityListBaseComponent } from '../../../shared/admin-entity-list-base/admin-entity-list-base.component';
import { ReviewService } from '../../../shared/entity-services/review.service';

@Component({
  selector: 'app-admin-review',
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
  templateUrl: './review.component.html'
})
export class ReviewComponent extends AdminEntityListBaseComponent<string, IReview> {
  pageSize = 10;

  constructor(protected override service: ReviewService) {
    super(service);
  }

  setDisplayedColumns(): string[] {
    return ['id', 'name', 'createdAt'];
  }

  createNew() {
    console.error('todo')
  }
}
