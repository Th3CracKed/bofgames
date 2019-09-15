import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { BofgamesSharedModule } from 'app/shared';
import { BofgamesCoreModule } from 'app/core';
import { BofgamesAppRoutingModule } from './app-routing.module';
import { BofgamesHomeModule } from './home/home.module';
import { BofgamesAccountModule } from './account/account.module';
import { BofgamesEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { TestComponent } from './test/test.component';
import { ItemListComponent } from './component/item-list/item-list.component';
import { ItemDetailComponent } from './component/item-detail/item-detail.component';
import { FillPipe } from './pipes/fill.pipe';
import { UserProfilComponent } from './component/user-profil/user-profil.component';
import { CartComponent } from './component/cart/cart.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

@NgModule({
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: true,
      defaultI18nLang: 'fr'
    }),
    BofgamesSharedModule.forRoot(),
    BofgamesCoreModule,
    BofgamesHomeModule,
    BofgamesAccountModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    BofgamesEntityModule,
    BofgamesAppRoutingModule
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    TestComponent,
    ItemListComponent,
    ItemDetailComponent,
    FillPipe,
    UserProfilComponent,
    CartComponent,
    SidebarComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class BofgamesAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
