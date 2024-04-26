import { Component, Signal } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth/auth.service';
import { IUser } from '@access-hub/api-interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    RouterLink,
    NgFor,
    RouterLinkActive,
    NgTemplateOutlet,
    MatToolbarModule,
    MatIconModule
  ]
})
export class NavBarComponent {
  user: Signal<IUser | undefined> = this.authService.user.asReadonly();

  constructor(private readonly authService: AuthService) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}

