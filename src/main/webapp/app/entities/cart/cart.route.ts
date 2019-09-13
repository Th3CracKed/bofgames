import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cart } from 'app/shared/model/cart.model';
import { CartService } from './cart.service';
import { CartComponent } from './cart.component';
import { CartDetailComponent } from './cart-detail.component';
import { CartUpdateComponent } from './cart-update.component';
import { CartDeletePopupComponent } from './cart-delete-dialog.component';
import { ICart } from 'app/shared/model/cart.model';

@Injectable({ providedIn: 'root' })
export class CartResolve implements Resolve<ICart> {
  constructor(private service: CartService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICart> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Cart>) => response.ok),
        map((cart: HttpResponse<Cart>) => cart.body)
      );
    }
    return of(new Cart());
  }
}

export const cartRoute: Routes = [
  {
    path: '',
    component: CartComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.cart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CartDetailComponent,
    resolve: {
      cart: CartResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.cart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CartUpdateComponent,
    resolve: {
      cart: CartResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.cart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CartUpdateComponent,
    resolve: {
      cart: CartResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.cart.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cartPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CartDeletePopupComponent,
    resolve: {
      cart: CartResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.cart.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
