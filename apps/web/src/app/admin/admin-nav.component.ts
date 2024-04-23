import { Component } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  template: `
    <div class="p-2">
      <b>Entities</b>
      <mat-nav-list>
        <a mat-list-item routerLink="entities/app">Apps</a>
        <a mat-list-item routerLink="entities/category">Categories</a>
        <a mat-list-item routerLink="entities/developer">Developers</a>
        <a mat-list-item routerLink="entities/platform">Platforms</a>
        <a mat-list-item routerLink="entities/review">Reviews</a>
        <a mat-list-item routerLink="entities/user">Users</a>
      </mat-nav-list>
    </div>
  `,
  standalone: true,
  imports: [
    MatListItem,
    MatNavList,
    RouterLink
  ]
})
export class AdminNavComponent {
}
