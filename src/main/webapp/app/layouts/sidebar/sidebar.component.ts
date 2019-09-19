import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'app/service/shopping-view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // constructor() {}
  isShoppingCart: boolean;

  constructor(private shopservice: ShoppingService, private router: Router) {}

  ngOnInit() {
    this.customiseView();
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

  customiseView() {
    this.isShoppingCart = this.router.url === '/shoppingCart';
    this.router.events.subscribe(() => (this.isShoppingCart = this.router.url === '/shoppingCart'));
  }
}
