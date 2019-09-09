/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BofgamesTestModule } from '../../../test.module';
import { CartLineDeleteDialogComponent } from 'app/entities/cart-line/cart-line-delete-dialog.component';
import { CartLineService } from 'app/entities/cart-line/cart-line.service';

describe('Component Tests', () => {
  describe('CartLine Management Delete Component', () => {
    let comp: CartLineDeleteDialogComponent;
    let fixture: ComponentFixture<CartLineDeleteDialogComponent>;
    let service: CartLineService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [CartLineDeleteDialogComponent]
      })
        .overrideTemplate(CartLineDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CartLineDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CartLineService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
