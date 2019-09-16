import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  constructor() {}

  openNav() {
    document.getElementById('mySidenav').classList.add('showShopping');
    //.style.width = '500px';
    document.getElementById('mainPage').classList.add('pushMainpage');
    document.getElementById('mainPage').style.marginRight = '500px';
    document.getElementById('openSideBarShop').style.display = 'none';
  }

  closeNav() {
    document.getElementById('mySidenav').classList.remove('showShopping');
    document.getElementById('mainPage').classList.remove('pushMainpage');
    //document.getElementById('mySidenav').style.width = '0';
    document.getElementById('openSideBarShop').style.display = 'block';
    document.getElementById('mainPage').style.marginRight = '0';
  }
}
