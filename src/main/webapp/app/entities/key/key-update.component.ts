import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKey, Key } from 'app/shared/model/key.model';
import { KeyService } from './key.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item';
import { ICartLine } from 'app/shared/model/cart-line.model';
import { CartLineService } from 'app/entities/cart-line';

@Component({
  selector: 'jhi-key-update',
  templateUrl: './key-update.component.html'
})
export class KeyUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItem[];

  cartlines: ICartLine[];

  editForm = this.fb.group({
    id: [],
    value: [],
    status: [],
    item: [],
    cartLine: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected keyService: KeyService,
    protected itemService: ItemService,
    protected cartLineService: CartLineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ key }) => {
      this.updateForm(key);
    });
    this.itemService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItem[]>) => response.body)
      )
      .subscribe((res: IItem[]) => (this.items = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cartLineService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICartLine[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICartLine[]>) => response.body)
      )
      .subscribe((res: ICartLine[]) => (this.cartlines = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(key: IKey) {
    this.editForm.patchValue({
      id: key.id,
      value: key.value,
      status: key.status,
      item: key.item,
      cartLine: key.cartLine
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const key = this.createFromForm();
    if (key.id !== undefined) {
      this.subscribeToSaveResponse(this.keyService.update(key));
    } else {
      this.subscribeToSaveResponse(this.keyService.create(key));
    }
  }

  private createFromForm(): IKey {
    return {
      ...new Key(),
      id: this.editForm.get(['id']).value,
      value: this.editForm.get(['value']).value,
      status: this.editForm.get(['status']).value,
      item: this.editForm.get(['item']).value,
      cartLine: this.editForm.get(['cartLine']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKey>>) {
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

  trackCartLineById(index: number, item: ICartLine) {
    return item.id;
  }
}
