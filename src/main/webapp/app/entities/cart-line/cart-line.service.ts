import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICartLine } from 'app/shared/model/cart-line.model';

type EntityResponseType = HttpResponse<ICartLine>;
type EntityArrayResponseType = HttpResponse<ICartLine[]>;

@Injectable({ providedIn: 'root' })
export class CartLineService {
  public resourceUrl = SERVER_API_URL + 'api/cart-lines';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/cart-lines';

  constructor(protected http: HttpClient) {}

  create(cartLine: ICartLine): Observable<EntityResponseType> {
    return this.http.post<ICartLine>(this.resourceUrl, cartLine, { observe: 'response' });
  }

  update(cartLine: ICartLine): Observable<EntityResponseType> {
    return this.http.put<ICartLine>(this.resourceUrl, cartLine, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICartLine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICartLine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICartLine[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
