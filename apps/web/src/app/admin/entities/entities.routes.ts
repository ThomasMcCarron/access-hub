import { Route } from '@angular/router';

export const EntityRoutes: Route[] = [
  {
    path: 'app',
    loadComponent: () => import('./app/app.component').then(m => m.AppComponent)
  },
  {
    path: 'category',
    loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent)
  },
  {
    path: 'developer',
    loadComponent: () => import('./developer/developer.component').then(m => m.DeveloperComponent)
  },
  {
    path: 'platform',
    loadComponent: () => import('./platform/platform.component').then(m => m.PlatformComponent)
  },
  {
    path: 'review',
    loadComponent: () => import('./review/review.component').then(m => m.ReviewComponent)
  },
  {
    path: 'user',
    loadComponent: () => import('./user/user.component').then(m => m.UserComponent)
  }
];
