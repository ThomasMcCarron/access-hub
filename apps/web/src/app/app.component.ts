import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookiePopupComponent } from './shared/cookie-popup/cookie-popup.component';

@Component({
  standalone: true,
  imports: [RouterModule, CookiePopupComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Access Hub';
}
