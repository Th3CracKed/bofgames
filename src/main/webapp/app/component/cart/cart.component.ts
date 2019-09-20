import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'app/service/shopping-view.service';
import { Router } from '@angular/router';
import { CartService } from 'app/service/cart.service';
import { Cart } from 'app/shared/model/cart.model';
import { CookieService } from 'ngx-cookie';
import { AccountService } from 'app/core/auth/account.service';
import { Client } from 'app/shared/model/client.model';
import { CartLine } from 'app/shared/model/cart-line.model';
import { MyModalService } from 'app/service/modal-view.service';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  last_known_scroll_position = 0;
  ticking = false;
  isFull: boolean;
  itemId: number;
  itemName: String;

  cart: Cart;

  constructor(
    private shopservice: ShoppingService,
    private router: Router,
    private cartService: CartService,
    private accountService: AccountService,
    private coockies: CookieService,
    private myModal: MyModalService
  ) {}
  ngOnInit() {
    this.customiseView();
    this.cartService.currentCart.subscribe(cart => {
      this.cart = cart;
    });
  }

  open_delete_modal(content: any, itemId: number, itemName: String) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.myModal.open(content);
  }

  openNav() {
    this.shopservice.openNav();
  }

  closeNav() {
    this.shopservice.closeNav();
  }

  customiseView() {
    this.isFull = this.router.url === '/shoppingCart';
    this.router.events.subscribe(() => {
      setTimeout(() => {
        this.isFull = this.router.url === '/shoppingCart';
      }, 500);
    });
  }

  confirm_delete() {
    this.myModal.close();
    this.removeItem(this.itemId);
    this.itemId = null;
    this.itemName = '';
  }

  getTotal(): Number {
    let total = 0;
    this.cart.cartLines.forEach(cartLine => {
      total += cartLine.unitPrice * cartLine.quantity;
    });
    return total;
  }

  downQty(idItem: Number) {
    if (this.isAuthenticated()) {
      this.accountService.identity().then(account => {
        this.cartService
          .decreaseQuantity((<Client>(<any>account)).id, this.cart.id, idItem)
          .subscribe(cart => this.cartService.updateCart(cart));
      });
    } else {
      let indexCartline = null;
      this.cart.cartLines.forEach((cartLine, index) => {
        if (cartLine.item.id === idItem) {
          if (cartLine.quantity === 1) {
            indexCartline = index;
          } else {
            cartLine.quantity = cartLine.quantity - 1;
          }
        }
      });
      if (indexCartline != null) {
        this.cart.cartLines.splice(indexCartline, 1);
      }
      this.coockies.putObject('panier', this.cart);
      this.cartService.updateCart(this.cart);
    }
  }

  upQty(idItem: number) {
    if (this.isAuthenticated()) {
      this.accountService.identity().then(account => {
        this.cartService.addToCart((<Client>(<any>account)).id, idItem).subscribe(cart => {
          if (cart !== null && cart !== undefined) {
            this.cartService.updateCart(cart);
          } else {
            alert("Erreur pendant l'ajout au panier ou l'augmentation de la quantité : plus de Clé dispo");
          }
        });
      });
    } else {
      this.cart.cartLines.forEach((cartLine, index) => {
        if (cartLine.item.id === idItem) {
          cartLine.quantity = cartLine.quantity + 1;
        }
      });

      this.coockies.putObject('panier', this.cart);
      this.cartService.updateCart(this.cart);
    }
  }

  removeItem(idItem: number) {
    if (this.isAuthenticated()) {
      this.accountService.identity().then(account => {
        this.cartService.deleteItem((<Client>(<any>account)).id, this.cart.id, idItem).subscribe(cart => this.cartService.updateCart(cart));
      });
    } else {
      let indexCartline = null;
      this.cart.cartLines.forEach((cartLine, index) => {
        if (cartLine.item.id === idItem) {
          indexCartline = index;
        }
      });
      if (indexCartline != null) {
        this.cart.cartLines.splice(indexCartline, 1);
      }
      this.coockies.putObject('panier', this.cart);
      this.cartService.updateCart(this.cart);
    }

    console.log(this.cart);
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}
