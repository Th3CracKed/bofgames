import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPromo } from 'app/shared/model/promo.model';

@Component({
  selector: 'jhi-promo-detail',
  templateUrl: './promo-detail.component.html'
})
export class PromoDetailComponent implements OnInit {
  promo: IPromo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ promo }) => {
      this.promo = promo;
    });
  }

  previousState() {
    window.history.back();
  }
}
