import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    RouterOutlet,
    MatToolbarModule,
    RouterLink
  ]
})
export class AdminDashboardComponent {
  title = 'Access Hub Admin Dashboard';
}
