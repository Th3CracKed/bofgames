import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'app/service/shopping-view.service';
import { Router } from '@angular/router';
import { CartService } from 'app/service/cart.service';
import { Cart } from 'app/shared/model/cart.model';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // constructor() {}
  isShoppingCart: boolean;
  cart: Cart;
  nbArticle: number;
  textArticle: String;

  constructor(private shopservice: ShoppingService, private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.customiseView();
    this.cartService.currentCart.subscribe(cart => {
      this.cart = cart;
      this.nbArticle = 0;
      this.cart.cartLines.forEach(element => {
        this.nbArticle += element.quantity;
      });
      if (this.nbArticle === 0) {
        this.textArticle = 'Aucun article';
      } else if (this.nbArticle === 1) {
        this.textArticle = this.nbArticle + ' article';
      } else {
        this.textArticle = this.nbArticle + ' articles';
      }
    });
  }

  openNav() {
    this.shopservice.openNav();
  }

  closeNav() {
    this.shopservice.closeNav();
  }

  onMouseWheelshop(evt) {
    if (window.scrollY > 10) {
      document.getElementById('headerCard').style.paddingTop = '10px';
    } else {
      document.getElementById('headerCard').style.paddingTop = '70px';
    }
  }

  hiddenRoutes() {
    return this.router.url === '/shoppingCart' || this.router.url === '/orderValidation';
  }

  customiseView() {
    this.isShoppingCart = this.hiddenRoutes();
    this.router.events.subscribe(() => (this.isShoppingCart = this.hiddenRoutes()));
  }
}
