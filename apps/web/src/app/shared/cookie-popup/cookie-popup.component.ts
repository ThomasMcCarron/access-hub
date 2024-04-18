import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';

const STORAGE_KEY = 'access-hub-cookies';

@Component({
  selector: 'app-cookie-popup',
  template: `
    <div class="popup" *ngIf="!cookiesAccepted">
      This site uses cookies from Google to deliver its services and to analyze traffic.

      <div class="buttons">
        <a
          href="https://policies.google.com/technologies/cookies"
          mat-button
          target="_blank"
          rel="noopener">
          [TODO: ADD COOKIES POLICY] More details
        </a>
        <button mat-flat-button color="primary" (click)="accept()">Ok, Got it</button>
      </div>
    </div>
  `,
  styleUrls: ['./cookie-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, MatButtonModule]
})
export class CookiePopupComponent {
  cookiesAccepted: boolean;

  constructor() {
    // Needs to be in a try/catch, because some browsers will
    // throw when using `localStorage` in private mode.
    try {
      this.cookiesAccepted = localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      this.cookiesAccepted = false;
    }
  }

  accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch { /* empty */ }

    this.cookiesAccepted = true;
  }
}
