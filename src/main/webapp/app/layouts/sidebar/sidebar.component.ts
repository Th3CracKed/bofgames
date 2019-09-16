import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'app/service/shopping-view.service';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // constructor() {}

  constructor(private shopservice: ShoppingService) {}

  ngOnInit() {}

  openNav() {
    this.shopservice.openNav();
  }

  closeNav() {
    this.shopservice.closeNav();
  }
}
