import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class MyModalService {
  constructor(private modalService: NgbModal) {}

  open(content: String) {
    const modalRef = this.modalService.open(content);
  }

  close() {
    this.modalService.dismissAll();
  }
}
