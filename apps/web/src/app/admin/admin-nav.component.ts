import { Component } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  template: `
    <div class="p-2">
      <span class="nav-menu-title">Entities</span>
      <mat-nav-list>
        <a mat-list-item routerLink="entities/app" routerLinkActive="active">
          Apps
        </a>
        <a mat-list-item routerLink="entities/category" routerLinkActive="active">Categories</a>
        <a mat-list-item routerLink="entities/developer" routerLinkActive="active">Developers</a>
        <a mat-list-item routerLink="entities/platform" routerLinkActive="active">Platforms</a>
        <a mat-list-item routerLink="entities/review" routerLinkActive="active">Reviews</a>
        <a mat-list-item routerLink="entities/user" routerLinkActive="active">Users</a>
      </mat-nav-list>
    </div>
  `,
  standalone: true,
  imports: [
    MatListItem,
    MatNavList,
    RouterLink,
    RouterLinkActive
  ]
})
export class AdminNavComponent {
}
