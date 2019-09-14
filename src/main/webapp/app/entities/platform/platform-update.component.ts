import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlatform, Platform } from 'app/shared/model/platform.model';
import { PlatformService } from './platform.service';

@Component({
  selector: 'jhi-platform-update',
  templateUrl: './platform-update.component.html'
})
export class PlatformUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    url: []
  });

  constructor(protected platformService: PlatformService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ platform }) => {
      this.updateForm(platform);
    });
  }

  updateForm(platform: IPlatform) {
    this.editForm.patchValue({
      id: platform.id,
      name: platform.name,
      url: platform.url
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const platform = this.createFromForm();
    if (platform.id !== undefined) {
      this.subscribeToSaveResponse(this.platformService.update(platform));
    } else {
      this.subscribeToSaveResponse(this.platformService.create(platform));
    }
  }

  private createFromForm(): IPlatform {
    return {
      ...new Platform(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      url: this.editForm.get(['url']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlatform>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
