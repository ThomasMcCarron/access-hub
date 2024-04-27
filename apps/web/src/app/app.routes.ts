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
    title: 'Access Hub - Contribute',
    loadComponent: () => import('./contribute').then(m => m.ContributeComponent)
  },
  {
    path: 'admin',
    title: 'Access Hub - Admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.AdminRoutes)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.routes').then(m => m.AccountRoutes)
  }
];
