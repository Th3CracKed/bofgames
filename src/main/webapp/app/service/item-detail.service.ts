import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { Item } from 'app/shared/model/item.model';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { isDeclareInterface } from '@babel/types';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {
  constructor(private http: HttpClient) {}

  getItem(id: number): Observable<Item> {
    return this.http.get(SERVER_API_URL + `api/items/${id}`);
  }

  addToCart(idClient: number, idItem: number): any {
    const data = {
      idClient: idClient,
      idItem: idItem
    };

    return this.http.put(SERVER_API_URL + 'api/client/cart/add/', data);
  }
}
