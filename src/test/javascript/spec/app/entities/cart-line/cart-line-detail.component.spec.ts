/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BofgamesTestModule } from '../../../test.module';
import { CartLineDetailComponent } from 'app/entities/cart-line/cart-line-detail.component';
import { CartLine } from 'app/shared/model/cart-line.model';

describe('Component Tests', () => {
  describe('CartLine Management Detail Component', () => {
    let comp: CartLineDetailComponent;
    let fixture: ComponentFixture<CartLineDetailComponent>;
    const route = ({ data: of({ cartLine: new CartLine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [CartLineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CartLineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CartLineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cartLine).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
