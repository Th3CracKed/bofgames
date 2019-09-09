import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICartLine } from 'app/shared/model/cart-line.model';
import { CartLineService } from './cart-line.service';

@Component({
  selector: 'jhi-cart-line-delete-dialog',
  templateUrl: './cart-line-delete-dialog.component.html'
})
export class CartLineDeleteDialogComponent {
  cartLine: ICartLine;

  constructor(protected cartLineService: CartLineService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cartLineService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cartLineListModification',
        content: 'Deleted an cartLine'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-cart-line-delete-popup',
  template: ''
})
export class CartLineDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cartLine }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CartLineDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.cartLine = cartLine;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cart-line', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cart-line', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
