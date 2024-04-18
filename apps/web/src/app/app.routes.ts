import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Access Hub',
    loadComponent: () => import('./home').then(m => m.HomeComponent)
  },
];
