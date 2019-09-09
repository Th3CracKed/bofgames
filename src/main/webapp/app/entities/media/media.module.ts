import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BofgamesSharedModule } from 'app/shared';
import {
  MediaComponent,
  MediaDetailComponent,
  MediaUpdateComponent,
  MediaDeletePopupComponent,
  MediaDeleteDialogComponent,
  mediaRoute,
  mediaPopupRoute
} from './';

const ENTITY_STATES = [...mediaRoute, ...mediaPopupRoute];

@NgModule({
  imports: [BofgamesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MediaComponent, MediaDetailComponent, MediaUpdateComponent, MediaDeleteDialogComponent, MediaDeletePopupComponent],
  entryComponents: [MediaComponent, MediaUpdateComponent, MediaDeleteDialogComponent, MediaDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BofgamesMediaModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
