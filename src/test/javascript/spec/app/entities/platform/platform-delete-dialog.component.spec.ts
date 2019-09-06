/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BofGamesTestModule } from '../../../test.module';
import { PlatformDeleteDialogComponent } from 'app/entities/platform/platform-delete-dialog.component';
import { PlatformService } from 'app/entities/platform/platform.service';

describe('Component Tests', () => {
  describe('Platform Management Delete Component', () => {
    let comp: PlatformDeleteDialogComponent;
    let fixture: ComponentFixture<PlatformDeleteDialogComponent>;
    let service: PlatformService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofGamesTestModule],
        declarations: [PlatformDeleteDialogComponent]
      })
        .overrideTemplate(PlatformDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlatformDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlatformService);
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
