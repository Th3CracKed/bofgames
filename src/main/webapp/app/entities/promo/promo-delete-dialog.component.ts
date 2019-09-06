import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPromo } from 'app/shared/model/promo.model';
import { PromoService } from './promo.service';

@Component({
  selector: 'jhi-promo-delete-dialog',
  templateUrl: './promo-delete-dialog.component.html'
})
export class PromoDeleteDialogComponent {
  promo: IPromo;

  constructor(protected promoService: PromoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.promoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'promoListModification',
        content: 'Deleted an promo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-promo-delete-popup',
  template: ''
})
export class PromoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ promo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PromoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.promo = promo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/promo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/promo', { outlets: { popup: null } }]);
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
