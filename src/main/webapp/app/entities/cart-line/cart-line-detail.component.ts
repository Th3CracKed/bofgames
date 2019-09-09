import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICartLine } from 'app/shared/model/cart-line.model';

@Component({
  selector: 'jhi-cart-line-detail',
  templateUrl: './cart-line-detail.component.html'
})
export class CartLineDetailComponent implements OnInit {
  cartLine: ICartLine;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cartLine }) => {
      this.cartLine = cartLine;
    });
  }

  previousState() {
    window.history.back();
  }
}
