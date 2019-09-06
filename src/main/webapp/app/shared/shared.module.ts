import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BofGamesSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [BofGamesSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [BofGamesSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BofGamesSharedModule {
  static forRoot() {
    return {
      ngModule: BofGamesSharedModule
    };
  }
}
