import { Component, Signal } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth/auth.service';
import { IUser, Role } from '@access-hub/api-interfaces';
import { MatMenuModule } from '@angular/material/menu';

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
    MatIconModule,
    MatMenuModule
  ]
})
export class NavBarComponent {
  user: Signal<IUser | undefined> = this.authService.user.asReadonly();
  role: Signal<Role> = this.authService.role;
  isLoaded: Signal<boolean> = this.authService.isLoaded.asReadonly();

  constructor(private readonly authService: AuthService) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  manageAccount() {
    this.authService.navigateToSettings();
  }

  protected readonly Role = Role;
}

