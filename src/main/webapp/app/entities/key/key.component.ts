import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKey } from 'app/shared/model/key.model';
import { AccountService } from 'app/core';
import { KeyService } from './key.service';

@Component({
  selector: 'jhi-key',
  templateUrl: './key.component.html'
})
export class KeyComponent implements OnInit, OnDestroy {
  keys: IKey[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected keyService: KeyService,
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
      this.keyService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IKey[]>) => res.ok),
          map((res: HttpResponse<IKey[]>) => res.body)
        )
        .subscribe((res: IKey[]) => (this.keys = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.keyService
      .query()
      .pipe(
        filter((res: HttpResponse<IKey[]>) => res.ok),
        map((res: HttpResponse<IKey[]>) => res.body)
      )
      .subscribe(
        (res: IKey[]) => {
          this.keys = res;
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
    this.registerChangeInKeys();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IKey) {
    return item.id;
  }

  registerChangeInKeys() {
    this.eventSubscriber = this.eventManager.subscribe('keyListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
