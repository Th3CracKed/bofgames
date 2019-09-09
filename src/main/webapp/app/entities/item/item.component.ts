import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IItem } from 'app/shared/model/item.model';
import { AccountService } from 'app/core';
import { ItemService } from './item.service';

@Component({
  selector: 'jhi-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit, OnDestroy {
  items: IItem[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected itemService: ItemService,
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
      this.itemService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IItem[]>) => res.ok),
          map((res: HttpResponse<IItem[]>) => res.body)
        )
        .subscribe((res: IItem[]) => (this.items = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.itemService
      .query()
      .pipe(
        filter((res: HttpResponse<IItem[]>) => res.ok),
        map((res: HttpResponse<IItem[]>) => res.body)
      )
      .subscribe(
        (res: IItem[]) => {
          this.items = res;
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
    this.registerChangeInItems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IItem) {
    return item.id;
  }

  registerChangeInItems() {
    this.eventSubscriber = this.eventManager.subscribe('itemListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
