import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BofGamesSharedModule } from 'app/shared';
import {
  KeyComponent,
  KeyDetailComponent,
  KeyUpdateComponent,
  KeyDeletePopupComponent,
  KeyDeleteDialogComponent,
  keyRoute,
  keyPopupRoute
} from './';

const ENTITY_STATES = [...keyRoute, ...keyPopupRoute];

@NgModule({
  imports: [BofGamesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [KeyComponent, KeyDetailComponent, KeyUpdateComponent, KeyDeleteDialogComponent, KeyDeletePopupComponent],
  entryComponents: [KeyComponent, KeyUpdateComponent, KeyDeleteDialogComponent, KeyDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BofGamesKeyModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
