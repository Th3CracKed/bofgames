/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BofGamesTestModule } from '../../../test.module';
import { PlatformDetailComponent } from 'app/entities/platform/platform-detail.component';
import { Platform } from 'app/shared/model/platform.model';

describe('Component Tests', () => {
  describe('Platform Management Detail Component', () => {
    let comp: PlatformDetailComponent;
    let fixture: ComponentFixture<PlatformDetailComponent>;
    const route = ({ data: of({ platform: new Platform(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BofGamesTestModule],
        declarations: [PlatformDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlatformDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlatformDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.platform).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
