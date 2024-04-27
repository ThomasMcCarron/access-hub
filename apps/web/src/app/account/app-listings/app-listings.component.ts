import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-app-listings',
  standalone: true,
  imports: [],
  templateUrl: './app-listings.component.html',
  styleUrl: './app-listings.component.scss'
})
export class AccountAppListingsComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
}
