import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, ICart } from 'app/shared/model/cart.model';
import { CartService } from 'app/entities/cart';
import { AccountService } from 'app/core';
import { Key } from 'app/shared/model/key.model';

@Component({
  selector: 'jhi-order-history-details',
  templateUrl: './order-history-details.component.html',
  styleUrls: ['./order-history-details.component.scss']
})
export class OrderHistoryDetailsComponent implements OnInit {
  private cart: ICart;
  keys: Object[] = [];
  constructor(private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.cartService.find(params.id).subscribe(res => {
        this.cart = res.body;
        console.log(this.cart);
        this.cart.cartLines.forEach(cartline => {
          cartline.keys.forEach(key => {
            this.keys.push({
              product: cartline.item.game.name,
              plateform: cartline.item.platform.name,
              value: key.value,
              price: cartline.unitPrice
            });
          });
        });
      })
    );
  }
}
