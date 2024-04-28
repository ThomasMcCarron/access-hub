import { Route } from '@angular/router';

export const ContributeRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Access Hub - Contribute',
    loadComponent: () => import('./contribute.component').then(m => m.ContributeComponent)
  },
  {
    path: 'list-an-app',
    title: 'Access Hub - List an App',
    loadComponent: () => import('./list-an-app/list-an-app.component').then(m => m.ListAnAppComponent)
  }
];
