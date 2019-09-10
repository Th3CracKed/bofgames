import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IClient, Client } from 'app/shared/model/client.model';
import { ClientService } from './client.service';
import { ICart } from 'app/shared/model/cart.model';
import { CartService } from 'app/entities/cart';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-client-update',
  templateUrl: './client-update.component.html'
})
export class ClientUpdateComponent implements OnInit {
  isSaving: boolean;

  carts: ICart[];

  users: IUser[];
  birthdateDp: any;

  editForm = this.fb.group({
    id: [],
    street: [],
    postCode: [],
    city: [],
    country: [],
    birthdate: [],
    cart: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected clientService: ClientService,
    protected cartService: CartService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);
    });
    this.cartService
      .query({ filter: 'driver-is-null' })
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
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(client: IClient) {
    this.editForm.patchValue({
      id: client.id,
      street: client.street,
      postCode: client.postCode,
      city: client.city,
      country: client.country,
      birthdate: client.birthdate,
      cart: client.cart,
      user: client.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  private createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id']).value,
      street: this.editForm.get(['street']).value,
      postCode: this.editForm.get(['postCode']).value,
      city: this.editForm.get(['city']).value,
      country: this.editForm.get(['country']).value,
      birthdate: this.editForm.get(['birthdate']).value,
      cart: this.editForm.get(['cart']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
