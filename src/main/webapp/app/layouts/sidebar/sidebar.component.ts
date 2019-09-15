import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  openNav() {
    document.getElementById('mySidenav').style.width = '550px';
    //document.getElementById('mainPage').style.marginRight = '250px';
    document.getElementById('openSideBarShop').style.display = 'none';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('openSideBarShop').style.display = 'block';
    //document.getElementById('mainPage').style.marginRight = '0';
  }
}
