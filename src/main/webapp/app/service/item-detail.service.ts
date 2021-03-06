import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { Item } from 'app/shared/model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {
  constructor(private http: HttpClient) {}

  getItem(id: number): Observable<Item> {
    return this.http.get(SERVER_API_URL + `api/items/${id}`);
  }

  addToCart(idClient: number, idItem: number): boolean {
    let res: object;
    this.http.put(SERVER_API_URL + `api/client/cart/add/?idClient=${idClient}&idItem=${idItem}`, '').subscribe(result => (res = result));
    return res == null;
  }
}
