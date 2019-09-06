import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.BofGamesClientModule)
      },
      {
        path: 'key',
        loadChildren: () => import('./key/key.module').then(m => m.BofGamesKeyModule)
      },
      {
        path: 'review',
        loadChildren: () => import('./review/review.module').then(m => m.BofGamesReviewModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.BofGamesCartModule)
      },
      {
        path: 'item',
        loadChildren: () => import('./item/item.module').then(m => m.BofGamesItemModule)
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.BofGamesGameModule)
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.BofGamesMediaModule)
      },
      {
        path: 'promo',
        loadChildren: () => import('./promo/promo.module').then(m => m.BofGamesPromoModule)
      },
      {
        path: 'platform',
        loadChildren: () => import('./platform/platform.module').then(m => m.BofGamesPlatformModule)
      },
      {
        path: 'tag',
        loadChildren: () => import('./tag/tag.module').then(m => m.BofGamesTagModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.BofGamesOrderModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BofGamesEntityModule {}
