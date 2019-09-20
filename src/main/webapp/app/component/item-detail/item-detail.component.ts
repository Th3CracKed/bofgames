import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailService } from 'app/service/item-detail.service';
import { Item } from 'app/shared/model/item.model';
import { CookieService } from 'ngx-cookie';
import { AccountService } from 'app/core';
import { Client } from 'app/shared/model/client.model';
import { Cart } from 'app/shared/model/cart.model';
import { CartLine } from 'app/shared/model/cart-line.model';
import { CartService } from 'app/service/cart.service';

@Component({
  selector: 'jhi-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  mark = 0;

  constructor(
    private route: ActivatedRoute,
    private itemDetailService: ItemDetailService,
    private cartService: CartService,
    private accountService: AccountService,
    private coockies: CookieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.itemDetailService.getItem(params.id).subscribe((item: Item) => {
        this.item = item;
        console.log(` mon resultat  pour l'item numéro ${params.id}` + JSON.stringify(this.item));
        this.calculateMark(item);
      })
    );
  }

  calculateMark(item: Item) {
    let markTotal = 0;
    item.game.reviews.forEach(review => (markTotal += review.mark || 0));
    console.log(`markTotal = ${markTotal}`);
    if (item.game.reviews && item.game.reviews.length !== 0) {
      this.mark = Math.floor(markTotal / item.game.reviews.length);
    }
    console.log(`this.mark = ${this.mark}`);
  }

  addToCard() {
    if (this.isAuthenticated()) {
      this.accountService.identity().then(account => {
        this.cartService.addToCart((<Client>(<any>account)).id, this.item.id).subscribe(cart => {
          if (cart !== null && cart !== undefined) {
            this.cartService.updateCart(cart);
          } else {
            alert("Erreur pendant l'ajout au panier ou l'augmentation de la quantité : plus de Clé dispo");
          }
        });
      });
    } else {
      let panier: Cart;
      panier = this.coockies.getObject('panier');
      console.log(panier);
      const item2ad: Item = this.item;
      item2ad.game.reviews = null;
      item2ad.game.media = null;
      item2ad.keys = null;
      if (panier === undefined) {
        // cookie not present
        panier = new Cart(null, false, false, null, null);
        const cartLine: CartLine = new CartLine(null, 1, this.item.price, false, null, item2ad, null);
        panier.cartLines = [cartLine];
        this.coockies.putObject('panier', panier);
      } else {
        // cookie present
        let itemPresent = false;
        panier.cartLines.forEach(element => {
          if (element.item.id === this.item.id) {
            element.quantity++;
            itemPresent = true;
          }
        });
        if (!itemPresent) {
          const cartLine: CartLine = new CartLine(null, 1, this.item.price, false, null, item2ad, null);
          panier.cartLines.push(cartLine);
        }
        this.coockies.putObject('panier', panier);
      }
      this.cartService.updateCart(panier);
    }
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}
