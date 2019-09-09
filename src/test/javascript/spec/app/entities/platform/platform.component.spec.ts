/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BofgamesTestModule } from '../../../test.module';
import { PlatformComponent } from 'app/entities/platform/platform.component';
import { PlatformService } from 'app/entities/platform/platform.service';
import { Platform } from 'app/shared/model/platform.model';

describe('Component Tests', () => {
  describe('Platform Management Component', () => {
    let comp: PlatformComponent;
    let fixture: ComponentFixture<PlatformComponent>;
    let service: PlatformService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofgamesTestModule],
        declarations: [PlatformComponent],
        providers: []
      })
        .overrideTemplate(PlatformComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlatformComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlatformService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Platform(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.platforms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
