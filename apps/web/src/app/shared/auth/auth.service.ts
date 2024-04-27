import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Session } from '@ory/client';
import { IUser, Role } from '@access-hub/api-interfaces';
import { ory } from './ory.config';
import { AxiosError } from 'axios';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, of, retry, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private session: WritableSignal<Session | undefined> = signal(undefined);
  public isAuthenticated: Signal<boolean> = computed(() => !!this.session()?.active);

  public user: WritableSignal<IUser | undefined> = signal(undefined);
  role: Signal<Role> = computed(() => this.user()?.role ?? Role.ANONYMOUS);

  public isLoaded: WritableSignal<boolean> = signal(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.tryLoadLoggedInUser().then(() => this.isLoaded.set(true));
  }

  login() {
    console.log(`${environment.oryBaseUrl}/ui/login`)
    window.location.href = `${environment.oryBaseUrl}/ui/login`;
  }

  register() {
    window.location.href = `${environment.oryBaseUrl}/ui/registration`;
  }

  navigateToSettings() {
    window.location.href = `${environment.oryBaseUrl}/ui/settings`;
  }

  async logout(): Promise<void> {
    return ory.frontend
      .createBrowserLogoutFlow()
      .then((res) => {
        return ory.frontend.updateLogoutFlow({ token: res.data.logout_token }).then(() => {
          this.session.set(undefined);
          this.user.set(undefined);
          console.log('Logged out, navigating to home');
          this.router.navigate(['/']);
        });
      })
      .catch((error: AxiosError) => {
        console.warn('Encountered an error logging out');
        if (error.response?.status === 401) {
          console.warn('User session already ended');
        } else {
          console.error(error.response);
        }
        this.session.set(undefined);
        this.user.set(undefined);
      });
  }

  async tryLoadLoggedInUser(): Promise<boolean> {
    console.debug('Loading logged in user');
    await ory.frontend
      .toSession()
      .then(async (response) => {
        this.session.set(response.data);
        await this.loadUser();
      })
      .catch((e: AxiosError) => {
        console.log(e.response);
        switch (e.response?.status) {
          case 401:
            this.user.set(undefined);
            break;
        }
      });

    console.debug('Loaded user: ', this.session != null && this.user != null);
    return this.session != null && this.user != null;
  }

  private async loadUser() {
    if (!this.session()?.identity?.id) {
      console.log('no session found');
      this.user.set(undefined);
      return;
    }

    await firstValueFrom(
      this.http.get<IUser>(`${environment.baseUrl}/account/${this.session()?.identity?.id}`, { observe: 'response' }).pipe(
        retry({ count: 3, delay: 100 }),
        switchMap((res: HttpResponse<IUser>) => {
          return of(res?.body ?? undefined);
        })
      )
    )
      .then((user) => {
        this.user.set(user);
      })
      .catch(() => {
        this.user.set(undefined);
      });
  }
}
