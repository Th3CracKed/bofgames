import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cart } from 'app/shared/model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}

  setCart(cart: Cart) {
    let res: object;
    this.http.post('http://localhost:8080/' + 'api/client/cart', cart).subscribe(result => (res = result));
    return res;
  }
}
