/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BofgamesTestModule } from '../../../test.module';
import { PromoComponent } from 'app/entities/promo/promo.component';
import { PromoService } from 'app/entities/promo/promo.service';
import { Promo } from 'app/shared/model/promo.model';

describe('Component Tests', () => {
  describe('Promo Management Component', () => {
    let comp: PromoComponent;
    let fixture: ComponentFixture<PromoComponent>;
    let service: PromoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [PromoComponent],
        providers: []
      })
        .overrideTemplate(PromoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PromoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PromoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Promo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.promos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
