import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReview } from 'app/shared/model/review.model';
import { AccountService } from 'app/core';
import { ReviewService } from './review.service';

@Component({
  selector: 'jhi-review',
  templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit, OnDestroy {
  reviews: IReview[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected reviewService: ReviewService,
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
      this.reviewService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IReview[]>) => res.ok),
          map((res: HttpResponse<IReview[]>) => res.body)
        )
        .subscribe((res: IReview[]) => (this.reviews = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.reviewService
      .query()
      .pipe(
        filter((res: HttpResponse<IReview[]>) => res.ok),
        map((res: HttpResponse<IReview[]>) => res.body)
      )
      .subscribe(
        (res: IReview[]) => {
          this.reviews = res;
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
    this.registerChangeInReviews();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReview) {
    return item.id;
  }

  registerChangeInReviews() {
    this.eventSubscriber = this.eventManager.subscribe('reviewListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
