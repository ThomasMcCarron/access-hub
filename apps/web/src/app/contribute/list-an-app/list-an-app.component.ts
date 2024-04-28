import { Component, HostBinding, Signal } from '@angular/core';
import { IUser } from '@access-hub/api-interfaces';
import { AuthService } from '../../shared/auth/auth.service';
import { JsonPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { CreateAppFormComponent } from '../../shared/create-app-form/create-app-form.component';

@Component({
  selector: 'app-list-an-app',
  standalone: true,
  imports: [
    JsonPipe,
    MatProgressSpinner,
    MatProgressBar,
    MatButton,
    CreateAppFormComponent
  ],
  templateUrl: './list-an-app.component.html',
  styleUrl: './list-an-app.component.scss'
})
export class ListAnAppComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  user: Signal<IUser | undefined> = this.authService.user.asReadonly();
  isLoaded: Signal<boolean> = this.authService.isLoaded.asReadonly();

  constructor(protected authService: AuthService) {
  }

  login() {
    this.authService.login();
  }

  register() {
    this.authService.register();
  }
}
