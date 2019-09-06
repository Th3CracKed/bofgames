import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BofGamesSharedModule } from 'app/shared';
import {
  PromoComponent,
  PromoDetailComponent,
  PromoUpdateComponent,
  PromoDeletePopupComponent,
  PromoDeleteDialogComponent,
  promoRoute,
  promoPopupRoute
} from './';

const ENTITY_STATES = [...promoRoute, ...promoPopupRoute];

@NgModule({
  imports: [BofGamesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PromoComponent, PromoDetailComponent, PromoUpdateComponent, PromoDeleteDialogComponent, PromoDeletePopupComponent],
  entryComponents: [PromoComponent, PromoUpdateComponent, PromoDeleteDialogComponent, PromoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BofGamesPromoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
