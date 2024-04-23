import { Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { IsActiveMatchOptions, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatListItem, MatNavList } from '@angular/material/list';
import { AdminNavComponent } from './admin-nav.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    RouterOutlet,
    MatToolbar,
    RouterLink,
    AsyncPipe,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    AdminNavComponent,
    NgClass
  ]
})
export class AdminComponent {
  @ViewChild('sidenav') sidenav?: MatSidenav;

  isExtraScreenSmall: Observable<boolean>;
  isScreenSmall: Observable<boolean>;

  matchOptions: IsActiveMatchOptions = {
    fragment: 'exact',
    matrixParams: 'exact',
    queryParams: 'exact',
    paths: 'exact',
  };

  constructor(
    private breakpoints: BreakpointObserver,
    protected router: Router
  ) {
    this.isExtraScreenSmall = breakpoints.observe(`(max-width: 959px)`)
      .pipe(
        map(breakpoint => breakpoint.matches)
      );
    this.isScreenSmall = breakpoints.observe(`(max-width: 720px)`)
      .pipe(
        map(breakpoint => breakpoint.matches)
      );
  }

  toggleSidenav() {
    this.sidenav?.toggle();
  }
}
