import { Component } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

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
}

