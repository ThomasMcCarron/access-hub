import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookiePopupComponent } from './shared/cookie-popup/cookie-popup.component';
import { NavBarComponent } from './shared/navbar';

@Component({
  standalone: true,
  imports: [RouterModule, CookiePopupComponent, NavBarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Access Hub';
}
