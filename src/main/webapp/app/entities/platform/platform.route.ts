import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Platform } from 'app/shared/model/platform.model';
import { PlatformService } from './platform.service';
import { PlatformComponent } from './platform.component';
import { PlatformDetailComponent } from './platform-detail.component';
import { PlatformUpdateComponent } from './platform-update.component';
import { PlatformDeletePopupComponent } from './platform-delete-dialog.component';
import { IPlatform } from 'app/shared/model/platform.model';

@Injectable({ providedIn: 'root' })
export class PlatformResolve implements Resolve<IPlatform> {
  constructor(private service: PlatformService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlatform> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Platform>) => response.ok),
        map((platform: HttpResponse<Platform>) => platform.body)
      );
    }
    return of(new Platform());
  }
}

export const platformRoute: Routes = [
  {
    path: '',
    component: PlatformComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.platform.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlatformDetailComponent,
    resolve: {
      platform: PlatformResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.platform.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlatformUpdateComponent,
    resolve: {
      platform: PlatformResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.platform.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlatformUpdateComponent,
    resolve: {
      platform: PlatformResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.platform.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const platformPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlatformDeletePopupComponent,
    resolve: {
      platform: PlatformResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.platform.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
