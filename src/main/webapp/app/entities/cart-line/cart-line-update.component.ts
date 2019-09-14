import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICartLine, CartLine } from 'app/shared/model/cart-line.model';
import { CartLineService } from './cart-line.service';
import { ICart } from 'app/shared/model/cart.model';
import { CartService } from 'app/entities/cart';

@Component({
  selector: 'jhi-cart-line-update',
  templateUrl: './cart-line-update.component.html'
})
export class CartLineUpdateComponent implements OnInit {
  isSaving: boolean;

  carts: ICart[];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    unitPrice: [],
    expired: [],
    cart: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cartLineService: CartLineService,
    protected cartService: CartService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cartLine }) => {
      this.updateForm(cartLine);
    });
    this.cartService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICart[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICart[]>) => response.body)
      )
      .subscribe((res: ICart[]) => (this.carts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cartLine: ICartLine) {
    this.editForm.patchValue({
      id: cartLine.id,
      quantity: cartLine.quantity,
      unitPrice: cartLine.unitPrice,
      expired: cartLine.expired,
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

  trackCartById(index: number, item: ICart) {
    return item.id;
  }
}
