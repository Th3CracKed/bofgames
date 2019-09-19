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
}
