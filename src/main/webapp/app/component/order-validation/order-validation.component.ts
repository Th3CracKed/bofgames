import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/service/cart.service';
import { Cart } from 'app/shared/model/cart.model';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { AccountService } from 'app/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'jhi-order-validation',
  templateUrl: './order-validation.component.html',
  styleUrls: ['./order-validation.component.scss']
})
export class OrderValidationComponent implements OnInit {
  currentPage: number;
  private cart: Cart;

  constructor(
    private cartService: CartService,
    private router: Router,
    private accountService: AccountService,
    private cookies: CookieService
  ) {
    this.currentPage = 1;
  }

  ngOnInit() {
    this.getCard();
  }

  private getCard() {
    this.accountService.identity().then(account => {
      this.cartService.getCart(account.id).subscribe(cart => {
        this.cart = cart;
      });
    });
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.checkbounderise();
  }

  PrevPage() {
    this.currentPage = this.currentPage - 1;
    this.checkbounderise();
  }

  checkbounderise() {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    if (this.currentPage > 3) {
      this.currentPage = 3;
    }
  }

  confirmCheckout() {
    this.cartService.buyCart(this.cart.driver.id, this.cart.id).subscribe(res => {
      this.cartService.updateCart(null);
      this.cookies.remove('panier');
      this.router.navigate(['/orderHistory/' + this.cart.id]);
    });
  }
}
