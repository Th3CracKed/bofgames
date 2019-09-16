import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CartLine } from 'app/shared/model/cart-line.model';
import { CartLineService } from './cart-line.service';
import { CartLineComponent } from './cart-line.component';
import { CartLineDetailComponent } from './cart-line-detail.component';
import { CartLineUpdateComponent } from './cart-line-update.component';
import { CartLineDeletePopupComponent } from './cart-line-delete-dialog.component';
import { ICartLine } from 'app/shared/model/cart-line.model';

@Injectable({ providedIn: 'root' })
export class CartLineResolve implements Resolve<ICartLine> {
  constructor(private service: CartLineService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICartLine> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CartLine>) => response.ok),
        map((cartLine: HttpResponse<CartLine>) => cartLine.body)
      );
    }
    return of(new CartLine());
  }
}

export const cartLineRoute: Routes = [
  {
    path: '',
    component: CartLineComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.cartLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CartLineDetailComponent,
    resolve: {
      cartLine: CartLineResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.cartLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CartLineUpdateComponent,
    resolve: {
      cartLine: CartLineResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.cartLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CartLineUpdateComponent,
    resolve: {
      cartLine: CartLineResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.cartLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cartLinePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CartLineDeletePopupComponent,
    resolve: {
      cartLine: CartLineResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.cartLine.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
