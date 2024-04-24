import { Route } from '@angular/router';

export const EntityRoutes: Route[] = [
  {
    path: 'app',
    title: 'Access Hub - Admin - Apps',
    loadComponent: () => import('./app/app.component').then(m => m.AppComponent)
  },
  {
    path: 'category',
    title: 'Access Hub - Admin - Categories',
    loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent)
  },
  {
    path: 'developer',
    title: 'Access Hub - Admin - Developers',
    loadComponent: () => import('./developer/developer.component').then(m => m.DeveloperComponent)
  },
  {
    path: 'platform',
    title: 'Access Hub - Admin - Platforms',
    loadComponent: () => import('./platform/platform.component').then(m => m.PlatformComponent)
  },
  {
    path: 'review',
    title: 'Access Hub - Admin - Reviews',
    loadComponent: () => import('./review/review.component').then(m => m.ReviewComponent)
  },
  {
    path: 'user',
    title: 'Access Hub - Admin - Users',
    loadComponent: () => import('./user/user.component').then(m => m.UserComponent)
  }
];
