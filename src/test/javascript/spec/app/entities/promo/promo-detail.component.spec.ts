/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BofgamesTestModule } from '../../../test.module';
import { PromoDetailComponent } from 'app/entities/promo/promo-detail.component';
import { Promo } from 'app/shared/model/promo.model';

describe('Component Tests', () => {
  describe('Promo Management Detail Component', () => {
    let comp: PromoDetailComponent;
    let fixture: ComponentFixture<PromoDetailComponent>;
    const route = ({ data: of({ promo: new Promo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [PromoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PromoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PromoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.promo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
