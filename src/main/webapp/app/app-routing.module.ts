import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute, sidebarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { ItemDetailComponent } from './component/item-detail/item-detail.component';
import { ItemListComponent } from './component/item-list/item-list.component';
import { UserProfilComponent } from './component/user-profil/user-profil.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { OrderValidationComponent } from './component/order-validation/order-validation.component';
import { UserRouteAccessService } from './core/auth/user-route-access-service';
import { OrderHistoryDetailsComponent } from './component/order-history-details/order-history-details.component';
const LAYOUT_ROUTES = [navbarRoute, sidebarRoute, ...errorRoute];
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'profil',
          component: UserProfilComponent,
          data: {
            pageTitle: 'home.profil'
          }
        },
        {
          path: 'shoppingCart',
          component: CartComponent,
          data: {
            pageTitle: 'home.shoppingCart'
          }
        },
        {
          path: 'orderValidation',
          component: OrderValidationComponent,
          data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'home.orderValidation'
          },
          canActivate: [UserRouteAccessService]
        },
        {
          path: 'orderHistory',
          component: OrderHistoryComponent,
          data: {
            pageTitle: 'home.orderHistory'
          }
        },
        {
          path: 'orderHistory/:id',
          component: OrderHistoryDetailsComponent,
          data: {
            pageTitle: 'home.orderHistoryDetail'
          }
        },
        {
          path: 'games/:id',
          component: ItemDetailComponent,
          data: {
            pageTitle: 'home.detail'
          }
        },
        {
          path: 'games',
          component: ItemListComponent,
          data: {
            pageTitle: 'home.games'
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
