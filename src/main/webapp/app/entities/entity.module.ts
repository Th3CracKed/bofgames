import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

const PATH = 'admin';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: `${PATH}/client`,
        loadChildren: () => import('./client/client.module').then(m => m.BofgamesClientModule)
      },
      {
        path: `${PATH}/key`,
        loadChildren: () => import('./key/key.module').then(m => m.BofgamesKeyModule)
      },
      {
        path: `${PATH}/review`,
        loadChildren: () => import('./review/review.module').then(m => m.BofgamesReviewModule)
      },
      {
        path: `${PATH}/cart`,
        loadChildren: () => import('./cart/cart.module').then(m => m.BofgamesCartModule)
      },
      {
        path: `${PATH}/item`,
        loadChildren: () => import('./item/item.module').then(m => m.BofgamesItemModule)
      },
      {
        path: `${PATH}/game`,
        loadChildren: () => import('./game/game.module').then(m => m.BofgamesGameModule)
      },
      {
        path: `${PATH}/media`,
        loadChildren: () => import('./media/media.module').then(m => m.BofgamesMediaModule)
      },
      {
        path: `${PATH}/promo`,
        loadChildren: () => import('./promo/promo.module').then(m => m.BofgamesPromoModule)
      },
      {
        path: `${PATH}/platform`,
        loadChildren: () => import('./platform/platform.module').then(m => m.BofgamesPlatformModule)
      },
      {
        path: `${PATH}/tag`,
        loadChildren: () => import('./tag/tag.module').then(m => m.BofgamesTagModule)
      },
      {
        path: `${PATH}/cart-line`,
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
