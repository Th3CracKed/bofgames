/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BofgamesTestModule } from '../../../test.module';
import { KeyComponent } from 'app/entities/key/key.component';
import { KeyService } from 'app/entities/key/key.service';
import { Key } from 'app/shared/model/key.model';

describe('Component Tests', () => {
  describe('Key Management Component', () => {
    let comp: KeyComponent;
    let fixture: ComponentFixture<KeyComponent>;
    let service: KeyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [KeyComponent],
        providers: []
      })
        .overrideTemplate(KeyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KeyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KeyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Key(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.keys[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
