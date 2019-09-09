import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BofgamesSharedModule } from 'app/shared';
import {
  PlatformComponent,
  PlatformDetailComponent,
  PlatformUpdateComponent,
  PlatformDeletePopupComponent,
  PlatformDeleteDialogComponent,
  platformRoute,
  platformPopupRoute
} from './';

const ENTITY_STATES = [...platformRoute, ...platformPopupRoute];

@NgModule({
  imports: [BofgamesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlatformComponent,
    PlatformDetailComponent,
    PlatformUpdateComponent,
    PlatformDeleteDialogComponent,
    PlatformDeletePopupComponent
  ],
  entryComponents: [PlatformComponent, PlatformUpdateComponent, PlatformDeleteDialogComponent, PlatformDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BofgamesPlatformModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
