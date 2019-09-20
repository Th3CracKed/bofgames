import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/service/cart.service';
import { Cart } from 'app/shared/model/cart.model';

@Component({
  selector: 'jhi-order-validation',
  templateUrl: './order-validation.component.html',
  styleUrls: ['./order-validation.component.scss']
})
export class OrderValidationComponent implements OnInit {
  currentPage: number;
  private cart: Cart;
  constructor(private cartService: CartService) {
    this.currentPage = 1;
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
      alert('commande Complete');
      this.cartService.updateCart(null);
    });
  }

  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => (this.cart = cart));
  }
}
