import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMedia, Media } from 'app/shared/model/media.model';
import { MediaService } from './media.service';
import { IGame } from 'app/shared/model/game.model';
import { GameService } from 'app/entities/game';

@Component({
  selector: 'jhi-media-update',
  templateUrl: './media-update.component.html'
})
export class MediaUpdateComponent implements OnInit {
  isSaving: boolean;

  games: IGame[];

  editForm = this.fb.group({
    id: [],
    url: [],
    alt: [],
    game: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mediaService: MediaService,
    protected gameService: GameService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ media }) => {
      this.updateForm(media);
    });
    this.gameService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGame[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGame[]>) => response.body)
      )
      .subscribe((res: IGame[]) => (this.games = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(media: IMedia) {
    this.editForm.patchValue({
      id: media.id,
      url: media.url,
      alt: media.alt,
      game: media.game
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const media = this.createFromForm();
    if (media.id !== undefined) {
      this.subscribeToSaveResponse(this.mediaService.update(media));
    } else {
      this.subscribeToSaveResponse(this.mediaService.create(media));
    }
  }

  private createFromForm(): IMedia {
    return {
      ...new Media(),
      id: this.editForm.get(['id']).value,
      url: this.editForm.get(['url']).value,
      alt: this.editForm.get(['alt']).value,
      game: this.editForm.get(['game']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedia>>) {
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

  trackGameById(index: number, item: IGame) {
    return item.id;
  }
}
