import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.BofgamesClientModule)
      },
      {
        path: 'key',
        loadChildren: () => import('./key/key.module').then(m => m.BofgamesKeyModule)
      },
      {
        path: 'review',
        loadChildren: () => import('./review/review.module').then(m => m.BofgamesReviewModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.BofgamesCartModule)
      },
      {
        path: 'item',
        loadChildren: () => import('./item/item.module').then(m => m.BofgamesItemModule)
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.BofgamesGameModule)
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.BofgamesMediaModule)
      },
      {
        path: 'promo',
        loadChildren: () => import('./promo/promo.module').then(m => m.BofgamesPromoModule)
      },
      {
        path: 'platform',
        loadChildren: () => import('./platform/platform.module').then(m => m.BofgamesPlatformModule)
      },
      {
        path: 'tag',
        loadChildren: () => import('./tag/tag.module').then(m => m.BofgamesTagModule)
      },
      {
        path: 'cart-line',
        loadChildren: () => import('./cart-line/cart-line.module').then(m => m.BofgamesCartLineModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BofgamesEntityModule {}
