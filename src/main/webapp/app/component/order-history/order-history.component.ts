import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  ordersHistory = ['1', '2', '3', '4'];

  constructor() {}

  ngOnInit() {}
}
