import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-order-validation',
  templateUrl: './order-validation.component.html',
  styleUrls: ['./order-validation.component.scss']
})
export class OrderValidationComponent implements OnInit {
  currentPage: number;
  constructor() {
    this.currentPage = 1;
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.checkbounderise();
  }

  PrevPage() {
    this.currentPage = this.currentPage - 1;
    this.checkbounderise();
  }

  checkbounderise() {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    if (this.currentPage > 3) {
      this.currentPage = 3;
    }
  }

  ngOnInit() {}
}
