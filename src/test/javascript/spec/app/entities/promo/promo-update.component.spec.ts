/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BofgamesTestModule } from '../../../test.module';
import { PromoUpdateComponent } from 'app/entities/promo/promo-update.component';
import { PromoService } from 'app/entities/promo/promo.service';
import { Promo } from 'app/shared/model/promo.model';

describe('Component Tests', () => {
  describe('Promo Management Update Component', () => {
    let comp: PromoUpdateComponent;
    let fixture: ComponentFixture<PromoUpdateComponent>;
    let service: PromoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [PromoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PromoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PromoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PromoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Promo(123);
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
        const entity = new Promo();
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
