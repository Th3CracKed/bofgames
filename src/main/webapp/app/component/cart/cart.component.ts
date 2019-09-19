import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'app/service/shopping-view.service';
import { Router } from '@angular/router';
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
  itemName: String;

  constructor(private shopservice: ShoppingService, private router: Router, private myModal: MyModalService) {}
  ngOnInit() {
    this.customiseView();
  }

  open_delete_modal(content: any, value: String) {
    this.itemName = value;
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

  confirm_delete(e: String) {
    this.myModal.close();
    alert(e);
  }
}
