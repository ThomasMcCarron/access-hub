import { Route } from '@angular/router';

export const AccountRoutes: Route[] = [
  {
    path: 'account',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'listings',
    pathMatch: 'full',
    title: 'Access Hub - My Listings',
    loadComponent: () => import('./app-listings/app-listings.component').then(m => m.AccountAppListingsComponent)
  },
  {
    path: 'reviews',
    title: 'Access Hub - My Reviews',
    loadComponent: () => import('./reviews/reviews.component').then(m => m.AccountReviewsComponent)
  },
];
