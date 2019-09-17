import { Route } from '@angular/router';

import { HomeComponent } from './';

export const HOME_ROUTE: Route = {
  path: '',
  redirectTo: '/games',
  pathMatch: 'full',
  data: {
    authorities: [],
    pageTitle: 'home.title'
  }
};
