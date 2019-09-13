import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BofgamesSharedModule } from 'app/shared';
import { HOME_ROUTE, JHomeComponent } from './';

@NgModule({
  imports: [BofgamesSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [JHomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BofgamesJHomeModule {}
