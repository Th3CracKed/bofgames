import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlatform } from 'app/shared/model/platform.model';
import { PlatformService } from './platform.service';

@Component({
  selector: 'jhi-platform-delete-dialog',
  templateUrl: './platform-delete-dialog.component.html'
})
export class PlatformDeleteDialogComponent {
  platform: IPlatform;

  constructor(protected platformService: PlatformService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.platformService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'platformListModification',
        content: 'Deleted an platform'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-platform-delete-popup',
  template: ''
})
export class PlatformDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ platform }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlatformDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.platform = platform;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/platform', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/platform', { outlets: { popup: null } }]);
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
