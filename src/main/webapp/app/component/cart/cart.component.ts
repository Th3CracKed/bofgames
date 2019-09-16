import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'app/service/shopping-view.service';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // constructor() {}

  last_known_scroll_position = 0;
  ticking = false;

  constructor(private shopservice: ShoppingService) {}
  ngOnInit() {}

  openNav() {
    this.shopservice.openNav();
  }

  closeNav() {
    this.shopservice.closeNav();
  }
}
