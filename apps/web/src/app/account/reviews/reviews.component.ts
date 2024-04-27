import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class AccountReviewsComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
}
