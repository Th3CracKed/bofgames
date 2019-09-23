import { Component, OnInit } from '@angular/core';
import { Cart } from 'app/shared/model/cart.model';
import { CartService } from 'app/service/cart.service';
import { Client } from 'app/shared/model/client.model';
import { AccountService } from 'app/core';

@Component({
  selector: 'jhi-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  carts: Cart[] = [];

  constructor(private cartService: CartService, private accountService: AccountService) {}

  ngOnInit() {
    //if (this.isAuthenticated()) {
    this.accountService.identity().then(account => {
      this.cartService.getOrders((<Client>(<any>account)).id).subscribe(carts => {
        this.carts = carts;
      });
    });
    //}
  }

  amount(cart: Cart) {
    let amount = 0;
    cart.cartLines.forEach(cartline => {
      amount += cartline.quantity * cartline.unitPrice;
    });
    return amount;
  }

  nbArticle(cart: Cart) {
    let nb = 0;
    cart.cartLines.forEach(cartline => {
      nb += cartline.quantity;
    });
    return nb;
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}
