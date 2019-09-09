import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICartLine } from 'app/shared/model/cart-line.model';
import { AccountService } from 'app/core';
import { CartLineService } from './cart-line.service';

@Component({
  selector: 'jhi-cart-line',
  templateUrl: './cart-line.component.html'
})
export class CartLineComponent implements OnInit, OnDestroy {
  cartLines: ICartLine[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected cartLineService: CartLineService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.cartLineService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<ICartLine[]>) => res.ok),
          map((res: HttpResponse<ICartLine[]>) => res.body)
        )
        .subscribe((res: ICartLine[]) => (this.cartLines = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.cartLineService
      .query()
      .pipe(
        filter((res: HttpResponse<ICartLine[]>) => res.ok),
        map((res: HttpResponse<ICartLine[]>) => res.body)
      )
      .subscribe(
        (res: ICartLine[]) => {
          this.cartLines = res;
          this.currentSearch = '';
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCartLines();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICartLine) {
    return item.id;
  }

  registerChangeInCartLines() {
    this.eventSubscriber = this.eventManager.subscribe('cartLineListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
