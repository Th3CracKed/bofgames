import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { TestComponent } from './test';
import { ItemDetailComponent } from './component/item-detail/item-detail.component';
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
        {
          path: 'games/:id',
          component: ItemDetailComponent
        },
        {
          path: 'games',
          component: ItemListComponent,
          data: {
            pageTitle: 'home.title'
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
