import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { TestComponent } from './test';
import { DetailComponent } from './detail/detail.component';
import { ItemListComponent } from './component/item-list/item-list.component';
const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'test',
          component: TestComponent
        },
        { path: 'detail', component: DetailComponent },
        {
          path: 'games',
          component: ItemListComponent
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
