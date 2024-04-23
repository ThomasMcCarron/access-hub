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
        loadComponent: () => import('./dashboard').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'entities',
        loadChildren: () => import('./entities/entities.routes').then(m => m.EntityRoutes)
      }
    ]
  }
];
