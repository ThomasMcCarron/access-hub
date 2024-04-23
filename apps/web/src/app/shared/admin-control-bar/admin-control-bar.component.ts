import { Component, Input } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-control-bar[returnTo]',
  templateUrl: './admin-control-bar.component.html',
  styleUrls: ['./admin-control-bar.component.scss'],
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
export class AdminControlBarComponent {
  @Input() returnTo: any[] | string = '..';
  @Input() title = '';
}

