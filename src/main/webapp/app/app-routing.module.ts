import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { TestComponent } from './test';
const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'test',
          component: TestComponent,
          data: {
            isEcom: true,
            pageTitle: 'ecom.title'
          }
        },
        {
          path: 'admin',
          loadChildren: () => import('./admin/admin.module').then(m => m.BofgamesAdminModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class BofgamesAppRoutingModule {}
