import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlatform } from 'app/shared/model/platform.model';

@Component({
  selector: 'jhi-platform-detail',
  templateUrl: './platform-detail.component.html'
})
export class PlatformDetailComponent implements OnInit {
  platform: IPlatform;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ platform }) => {
      this.platform = platform;
    });
  }

  previousState() {
    window.history.back();
  }
}
