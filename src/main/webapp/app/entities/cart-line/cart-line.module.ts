import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BofgamesSharedModule } from 'app/shared';
import {
  CartLineComponent,
  CartLineDetailComponent,
  CartLineUpdateComponent,
  CartLineDeletePopupComponent,
  CartLineDeleteDialogComponent,
  cartLineRoute,
  cartLinePopupRoute
} from './';

const ENTITY_STATES = [...cartLineRoute, ...cartLinePopupRoute];

@NgModule({
  imports: [BofgamesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CartLineComponent,
    CartLineDetailComponent,
    CartLineUpdateComponent,
    CartLineDeleteDialogComponent,
    CartLineDeletePopupComponent
  ],
  entryComponents: [CartLineComponent, CartLineUpdateComponent, CartLineDeleteDialogComponent, CartLineDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BofgamesCartLineModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
