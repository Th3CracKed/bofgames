import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cart } from 'app/shared/model/cart.model';
import { Observer, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { AccountService } from 'app/core';
import { Client } from 'app/shared/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject(null);
  currentCart = this.cart.asObservable();

  constructor(private http: HttpClient, private accountService: AccountService, private coockies: CookieService) {
    this.reloadCart();
  }

  setCart(cart: Cart): Observable<Cart> {
    return this.http.post('http://localhost:8080/' + 'api/client/cart', cart).pipe(map((body: any) => body));
  }

  getCart(idClient: Number): Observable<Cart> {
    return this.http.get('http://localhost:8080' + `/api/client/${idClient}/cart`).pipe(map((body: any) => body));
  }

  addToCart(idClient: number, idItem: number): Observable<Cart> {
    return this.http
      .put('http://localhost:8080/' + `api/client/cart/add/?idClient=${idClient}&idItem=${idItem}`, '')
      .pipe(map((body: any) => body));
  }

  updateCart(cart: Cart) {
    this.cart.next(cart);
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  reloadCart() {
    if (this.isAuthenticated()) {
      this.accountService.identity().then(account => {
        let idClient: Number;
        idClient = (<Client>(<any>account)).id;
        this.getCart(idClient).subscribe(cart => {
          this.updateCart(cart);
          console.log(this.cart);
        });
      });
    } else {
      this.updateCart(this.coockies.getObject('panier'));
      console.log(this.cart);
    }
  }

  decreaseQuantity(idClient: Number, idCart: Number, idItem: Number): Observable<Cart> {
    return this.http.put('http://localhost:8080/' + `api/client/cart/remove/?idCart=${idCart}&idClient=${idClient}&idItem=${idItem}`, '');
  }

  deleteItem(idClient: Number, idCart: Number, idItem: Number): Observable<Cart> {
    return this.http.delete('http://localhost:8080/' + `api/client/cart/delete/?idCart=${idCart}&idClient=${idClient}&idItem=${idItem}`);
  }
}
