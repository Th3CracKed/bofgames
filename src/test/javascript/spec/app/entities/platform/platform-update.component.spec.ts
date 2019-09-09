/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BofgamesTestModule } from '../../../test.module';
import { PlatformUpdateComponent } from 'app/entities/platform/platform-update.component';
import { PlatformService } from 'app/entities/platform/platform.service';
import { Platform } from 'app/shared/model/platform.model';

describe('Component Tests', () => {
  describe('Platform Management Update Component', () => {
    let comp: PlatformUpdateComponent;
    let fixture: ComponentFixture<PlatformUpdateComponent>;
    let service: PlatformService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [PlatformUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlatformUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlatformUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlatformService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Platform(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Platform();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
