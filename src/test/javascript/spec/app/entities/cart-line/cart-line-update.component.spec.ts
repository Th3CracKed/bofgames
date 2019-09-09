/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BofgamesTestModule } from '../../../test.module';
import { CartLineUpdateComponent } from 'app/entities/cart-line/cart-line-update.component';
import { CartLineService } from 'app/entities/cart-line/cart-line.service';
import { CartLine } from 'app/shared/model/cart-line.model';

describe('Component Tests', () => {
  describe('CartLine Management Update Component', () => {
    let comp: CartLineUpdateComponent;
    let fixture: ComponentFixture<CartLineUpdateComponent>;
    let service: CartLineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [CartLineUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CartLineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CartLineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CartLineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CartLine(123);
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
        const entity = new CartLine();
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
