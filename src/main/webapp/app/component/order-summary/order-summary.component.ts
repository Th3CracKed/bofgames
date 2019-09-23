import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Client } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { CartService } from 'app/service/cart.service';
import { Cart } from 'app/shared/model/cart.model';

@Component({
  selector: 'jhi-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  client: Client;
  cart: Cart;
  constructor(private accountService: AccountService, private clientService: ClientService, private cartService: CartService) {}
  ngOnInit() {
    this.accountService.identity().then(account => {
      this.clientService
        .find(account.id)
        .pipe(
          filter((response: HttpResponse<Client>) => response.ok),
          map((client: HttpResponse<Client>) => client.body)
        )
        .subscribe(
          client => {
            this.client = client;
          },
          error => {
            console.log(error);
          }
        );
    });
    this.cartService.currentCart.subscribe(cart => (this.cart = cart));
  }
}
