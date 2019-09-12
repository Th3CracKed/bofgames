import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICart, Cart } from 'app/shared/model/cart.model';
import { CartService } from './cart.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';

@Component({
  selector: 'jhi-cart-update',
  templateUrl: './cart-update.component.html'
})
export class CartUpdateComponent implements OnInit {
  isSaving: boolean;

  clients: IClient[];

  editForm = this.fb.group({
    id: [],
    expired: [],
    driver: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cartService: CartService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cart }) => {
      this.updateForm(cart);
    });
    this.clientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClient[]>) => response.body)
      )
      .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cart: ICart) {
    this.editForm.patchValue({
      id: cart.id,
      expired: cart.expired,
      driver: cart.driver
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cart = this.createFromForm();
    if (cart.id !== undefined) {
      this.subscribeToSaveResponse(this.cartService.update(cart));
    } else {
      this.subscribeToSaveResponse(this.cartService.create(cart));
    }
  }

  private createFromForm(): ICart {
    return {
      ...new Cart(),
      id: this.editForm.get(['id']).value,
      expired: this.editForm.get(['expired']).value,
      driver: this.editForm.get(['driver']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICart>>) {
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

  trackClientById(index: number, item: IClient) {
    return item.id;
  }
}
