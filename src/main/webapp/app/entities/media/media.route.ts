import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Media } from 'app/shared/model/media.model';
import { MediaService } from './media.service';
import { MediaComponent } from './media.component';
import { MediaDetailComponent } from './media-detail.component';
import { MediaUpdateComponent } from './media-update.component';
import { MediaDeletePopupComponent } from './media-delete-dialog.component';
import { IMedia } from 'app/shared/model/media.model';

@Injectable({ providedIn: 'root' })
export class MediaResolve implements Resolve<IMedia> {
  constructor(private service: MediaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMedia> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Media>) => response.ok),
        map((media: HttpResponse<Media>) => media.body)
      );
    }
    return of(new Media());
  }
}

export const mediaRoute: Routes = [
  {
    path: '',
    component: MediaComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.media.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MediaDetailComponent,
    resolve: {
      media: MediaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.media.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MediaUpdateComponent,
    resolve: {
      media: MediaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.media.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MediaUpdateComponent,
    resolve: {
      media: MediaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.media.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mediaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MediaDeletePopupComponent,
    resolve: {
      media: MediaResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.media.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
