import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Access Hub',
    loadComponent: () => import('./home').then(m => m.HomeComponent)
  },
  {
    path: 'contribute',
    loadChildren: () => import('./contribute/contributeRoutes').then(m => m.ContributeRoutes)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.AdminRoutes)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.routes').then(m => m.AccountRoutes)
  }
];
