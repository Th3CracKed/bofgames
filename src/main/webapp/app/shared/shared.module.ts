import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BofgamesSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [BofgamesSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [BofgamesSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BofgamesSharedModule {
  static forRoot() {
    return {
      ngModule: BofgamesSharedModule
    };
  }
}
