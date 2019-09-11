import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'app/shared/model/item.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  constructor(private http: HttpClient) {}

  public GetItems(): Observable<Item> {
    return this.http.get('http://localhost:8080/api/itemsList').pipe(map((body: any) => body));
  }
}
