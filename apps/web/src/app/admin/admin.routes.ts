import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';

export const AdminRoutes: Route[] = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Access Hub - Admin',
        loadComponent: () => import('./dashboard').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'entities',
        pathMatch: 'full',
        redirectTo: ''
      },
      {
        path: 'entities',
        loadChildren: () => import('./entities/entities.routes').then(m => m.EntityRoutes)
      }
    ]
  }
];
