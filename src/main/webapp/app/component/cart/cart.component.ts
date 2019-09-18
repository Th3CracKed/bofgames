import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'app/service/shopping-view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  last_known_scroll_position = 0;
  ticking = false;
  isFull: boolean;

  constructor(private shopservice: ShoppingService, private router: Router) {}
  ngOnInit() {
    this.customiseView();
  }

  openNav() {
    this.shopservice.openNav();
  }

  closeNav() {
    this.shopservice.closeNav();
  }

  customiseView() {
    this.isFull = this.router.url === '/shopingCart';
    this.router.events.subscribe(() => {
      setTimeout(() => {
        this.isFull = this.router.url === '/shopingCart';
      }, 500);
    });
  }
}
