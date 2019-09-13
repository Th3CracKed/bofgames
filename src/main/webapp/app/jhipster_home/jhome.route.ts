import { Route } from '@angular/router';

import { JHomeComponent } from './';

export const HOME_ROUTE: Route = {
  path: 'jhipster',
  component: JHomeComponent,
  data: {
    authorities: [],
    pageTitle: 'home.title'
  }
};
