import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPromo, Promo } from 'app/shared/model/promo.model';
import { PromoService } from './promo.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item';

@Component({
  selector: 'jhi-promo-update',
  templateUrl: './promo-update.component.html'
})
export class PromoUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItem[];
  startDp: any;
  endDp: any;

  editForm = this.fb.group({
    id: [],
    sale: [],
    start: [],
    end: [],
    item: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected promoService: PromoService,
    protected itemService: ItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ promo }) => {
      this.updateForm(promo);
    });
    this.itemService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItem[]>) => response.body)
      )
      .subscribe((res: IItem[]) => (this.items = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(promo: IPromo) {
    this.editForm.patchValue({
      id: promo.id,
      sale: promo.sale,
      start: promo.start,
      end: promo.end,
      item: promo.item
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const promo = this.createFromForm();
    if (promo.id !== undefined) {
      this.subscribeToSaveResponse(this.promoService.update(promo));
    } else {
      this.subscribeToSaveResponse(this.promoService.create(promo));
    }
  }

  private createFromForm(): IPromo {
    return {
      ...new Promo(),
      id: this.editForm.get(['id']).value,
      sale: this.editForm.get(['sale']).value,
      start: this.editForm.get(['start']).value,
      end: this.editForm.get(['end']).value,
      item: this.editForm.get(['item']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPromo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackItemById(index: number, item: IItem) {
    return item.id;
  }
}
