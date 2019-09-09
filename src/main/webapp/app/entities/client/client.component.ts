import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClient } from 'app/shared/model/client.model';
import { AccountService } from 'app/core';
import { ClientService } from './client.service';

@Component({
  selector: 'jhi-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit, OnDestroy {
  clients: IClient[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected clientService: ClientService,
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
      this.clientService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IClient[]>) => res.ok),
          map((res: HttpResponse<IClient[]>) => res.body)
        )
        .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.clientService
      .query()
      .pipe(
        filter((res: HttpResponse<IClient[]>) => res.ok),
        map((res: HttpResponse<IClient[]>) => res.body)
      )
      .subscribe(
        (res: IClient[]) => {
          this.clients = res;
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
    this.registerChangeInClients();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IClient) {
    return item.id;
  }

  registerChangeInClients() {
    this.eventSubscriber = this.eventManager.subscribe('clientListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
