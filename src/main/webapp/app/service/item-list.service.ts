import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Item } from 'app/shared/model/item.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  private subject = new BehaviorSubject<void>(null);
  private keywordToSearch: String;

  constructor(private http: HttpClient) {}

  public getAllItems(): Observable<Item[]> {
    return this.http.get(SERVER_API_URL + 'api/itemsList').pipe(map((body: any) => body));
  }

  public loadItems(): Observable<Item[]> {
    if (this.keywordToSearch) {
      const keywordToSearch = this.keywordToSearch;
      this.keywordToSearch = undefined;
      return this.searchItemsByGameName(keywordToSearch);
    } else {
      return this.getAllItems();
    }
  }

  public searchItemsByGameName(keywordToSearch: String): Observable<Item[]> {
    return this.http.get(SERVER_API_URL + `api/_search/items/${keywordToSearch}`).pipe(map((body: any) => body));
  }

  scheduleSearch(keywordToSearch: String) {
    this.keywordToSearch = keywordToSearch.trim();
    this.subject.next();
  }

  getSearchingStatus(): Observable<void> {
    return this.subject.asObservable();
  }

  recreate() {
    this.subject = new BehaviorSubject<void>(null);
  }
}
