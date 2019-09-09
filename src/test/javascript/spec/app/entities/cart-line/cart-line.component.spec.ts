/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BofgamesTestModule } from '../../../test.module';
import { CartLineComponent } from 'app/entities/cart-line/cart-line.component';
import { CartLineService } from 'app/entities/cart-line/cart-line.service';
import { CartLine } from 'app/shared/model/cart-line.model';

describe('Component Tests', () => {
  describe('CartLine Management Component', () => {
    let comp: CartLineComponent;
    let fixture: ComponentFixture<CartLineComponent>;
    let service: CartLineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [CartLineComponent],
        providers: []
      })
        .overrideTemplate(CartLineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CartLineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CartLineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CartLine(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cartLines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
