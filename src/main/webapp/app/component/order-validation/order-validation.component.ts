import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/service/cart.service';
import { Cart } from 'app/shared/model/cart.model';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'jhi-order-validation',
  templateUrl: './order-validation.component.html',
  styleUrls: ['./order-validation.component.scss']
})
export class OrderValidationComponent implements OnInit {
  currentPage: number;
  private cart: Cart;
  private clientId: Number;
  private cartId: Number;

  constructor(private cartService: CartService, private router: Router) {
    this.currentPage = 1;
  }

  nextPage() {
    console.log(this.cart);
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
    console.log(this.cart);
    this.cartService.buyCart(this.cart.driver.id, this.cart.id).subscribe(res => {
      console.log('interieur sub');
      //this.cartService.updateCart(null);
      this.router.navigate(['/orderHistory/' + this.cart.id]);
    });
  }

  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => {
      console.log(cart);
      this.cart = cart;

      this.cartId = this.cart.id;
      this.clientId = this.cart.driver.id;
    });
  }
}
