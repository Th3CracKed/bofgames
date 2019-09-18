import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'app/service/shopping-view.service';
import { Router } from '@angular/router';
import { CartService } from 'app/service/cart.service';
import { Cart } from 'app/shared/model/cart.model';
import { CookieService } from 'ngx-cookie';
import { AccountService } from 'app/core/auth/account.service';
import { Client } from 'app/shared/model/client.model';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  last_known_scroll_position = 0;
  ticking = false;
  isFull: boolean;

  cart: Cart;

  constructor(
    private shopservice: ShoppingService,
    private router: Router,
    private cartService: CartService,
    private accountService: AccountService,
    private coockies: CookieService
  ) {}
  ngOnInit() {
    this.customiseView();
    if (this.isAuthenticated()) {
      this.accountService.identity().then(account => {
        let idClient: Number;
        idClient = (<Client>(<any>account)).id;
        this.cartService.getCart(idClient).subscribe(cart => {
          this.cart = this.cart;
          console.log(this.cart);
        });
      });
    } else {
      this.cart = this.coockies.getObject('panier');
      console.log(this.cart);
    }
  }

  openNav() {
    this.shopservice.openNav();
  }

  closeNav() {
    this.shopservice.closeNav();
  }

  customiseView() {
    this.isFull = this.router.url === '/shopingCart';
    this.router.events.subscribe(() => (this.isFull = this.router.url === '/shopingCart'));
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}
