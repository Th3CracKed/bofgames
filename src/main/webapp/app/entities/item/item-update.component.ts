import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IItem, Item } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { ICart } from 'app/shared/model/cart.model';
import { CartService } from 'app/entities/cart';
import { IGame } from 'app/shared/model/game.model';
import { GameService } from 'app/entities/game';
import { IPlatform } from 'app/shared/model/platform.model';
import { PlatformService } from 'app/entities/platform';

@Component({
  selector: 'jhi-item-update',
  templateUrl: './item-update.component.html'
})
export class ItemUpdateComponent implements OnInit {
  isSaving: boolean;

  carts: ICart[];

  games: IGame[];

  platforms: IPlatform[];

  editForm = this.fb.group({
    id: [],
    price: [],
    carts: [],
    game: [],
    platform: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemService: ItemService,
    protected cartService: CartService,
    protected gameService: GameService,
    protected platformService: PlatformService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ item }) => {
      this.updateForm(item);
    });
    this.cartService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICart[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICart[]>) => response.body)
      )
      .subscribe((res: ICart[]) => (this.carts = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.gameService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGame[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGame[]>) => response.body)
      )
      .subscribe((res: IGame[]) => (this.games = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.platformService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlatform[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlatform[]>) => response.body)
      )
      .subscribe((res: IPlatform[]) => (this.platforms = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(item: IItem) {
    this.editForm.patchValue({
      id: item.id,
      price: item.price,
      carts: item.carts,
      game: item.game,
      platform: item.platform
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const item = this.createFromForm();
    if (item.id !== undefined) {
      this.subscribeToSaveResponse(this.itemService.update(item));
    } else {
      this.subscribeToSaveResponse(this.itemService.create(item));
    }
  }

  private createFromForm(): IItem {
    return {
      ...new Item(),
      id: this.editForm.get(['id']).value,
      price: this.editForm.get(['price']).value,
      carts: this.editForm.get(['carts']).value,
      game: this.editForm.get(['game']).value,
      platform: this.editForm.get(['platform']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItem>>) {
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

  trackGameById(index: number, item: IGame) {
    return item.id;
  }

  trackPlatformById(index: number, item: IPlatform) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
