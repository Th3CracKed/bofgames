import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute, sidebarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { TestComponent } from './test';
import { ItemDetailComponent } from './component/item-detail/item-detail.component';
import { ItemListComponent } from './component/item-list/item-list.component';
import { UserProfilComponent } from './component/user-profil/user-profil.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
const LAYOUT_ROUTES = [navbarRoute, sidebarRoute, ...errorRoute];
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'test',
          component: TestComponent
        },
        {
          path: 'profil',
          component: UserProfilComponent
        },
        {
          path: 'shopingCart',
          component: CartComponent
        },
        {
          path: 'orderHistory',
          component: OrderHistoryComponent
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
