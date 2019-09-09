import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICartLine, CartLine } from 'app/shared/model/cart-line.model';
import { CartLineService } from './cart-line.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item';
import { ICart } from 'app/shared/model/cart.model';
import { CartService } from 'app/entities/cart';

@Component({
  selector: 'jhi-cart-line-update',
  templateUrl: './cart-line-update.component.html'
})
export class CartLineUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItem[];

  carts: ICart[];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    unitPrice: [],
    expired: [],
    item: [],
    cart: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cartLineService: CartLineService,
    protected itemService: ItemService,
    protected cartService: CartService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cartLine }) => {
      this.updateForm(cartLine);
    });
    this.itemService
      .query({ filter: 'cartline-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IItem[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItem[]>) => response.body)
      )
      .subscribe(
        (res: IItem[]) => {
          if (!this.editForm.get('item').value || !this.editForm.get('item').value.id) {
            this.items = res;
          } else {
            this.itemService
              .find(this.editForm.get('item').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IItem>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IItem>) => subResponse.body)
              )
              .subscribe(
                (subRes: IItem) => (this.items = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.cartService
      .query({ filter: 'cartline-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICart[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICart[]>) => response.body)
      )
      .subscribe(
        (res: ICart[]) => {
          if (!this.editForm.get('cart').value || !this.editForm.get('cart').value.id) {
            this.carts = res;
          } else {
            this.cartService
              .find(this.editForm.get('cart').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICart>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICart>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICart) => (this.carts = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(cartLine: ICartLine) {
    this.editForm.patchValue({
      id: cartLine.id,
      quantity: cartLine.quantity,
      unitPrice: cartLine.unitPrice,
      expired: cartLine.expired,
      item: cartLine.item,
      cart: cartLine.cart
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cartLine = this.createFromForm();
    if (cartLine.id !== undefined) {
      this.subscribeToSaveResponse(this.cartLineService.update(cartLine));
    } else {
      this.subscribeToSaveResponse(this.cartLineService.create(cartLine));
    }
  }

  private createFromForm(): ICartLine {
    return {
      ...new CartLine(),
      id: this.editForm.get(['id']).value,
      quantity: this.editForm.get(['quantity']).value,
      unitPrice: this.editForm.get(['unitPrice']).value,
      expired: this.editForm.get(['expired']).value,
      item: this.editForm.get(['item']).value,
      cart: this.editForm.get(['cart']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICartLine>>) {
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

  trackCartById(index: number, item: ICart) {
    return item.id;
  }
}
