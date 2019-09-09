import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlatform } from 'app/shared/model/platform.model';
import { AccountService } from 'app/core';
import { PlatformService } from './platform.service';

@Component({
  selector: 'jhi-platform',
  templateUrl: './platform.component.html'
})
export class PlatformComponent implements OnInit, OnDestroy {
  platforms: IPlatform[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected platformService: PlatformService,
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
      this.platformService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IPlatform[]>) => res.ok),
          map((res: HttpResponse<IPlatform[]>) => res.body)
        )
        .subscribe((res: IPlatform[]) => (this.platforms = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.platformService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlatform[]>) => res.ok),
        map((res: HttpResponse<IPlatform[]>) => res.body)
      )
      .subscribe(
        (res: IPlatform[]) => {
          this.platforms = res;
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
    this.registerChangeInPlatforms();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlatform) {
    return item.id;
  }

  registerChangeInPlatforms() {
    this.eventSubscriber = this.eventManager.subscribe('platformListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
