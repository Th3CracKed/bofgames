/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BofgamesTestModule } from '../../../test.module';
import { KeyUpdateComponent } from 'app/entities/key/key-update.component';
import { KeyService } from 'app/entities/key/key.service';
import { Key } from 'app/shared/model/key.model';

describe('Component Tests', () => {
  describe('Key Management Update Component', () => {
    let comp: KeyUpdateComponent;
    let fixture: ComponentFixture<KeyUpdateComponent>;
    let service: KeyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [KeyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(KeyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KeyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KeyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Key(123);
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
        const entity = new Key();
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
