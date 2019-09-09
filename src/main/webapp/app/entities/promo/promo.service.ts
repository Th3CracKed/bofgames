import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPromo } from 'app/shared/model/promo.model';

type EntityResponseType = HttpResponse<IPromo>;
type EntityArrayResponseType = HttpResponse<IPromo[]>;

@Injectable({ providedIn: 'root' })
export class PromoService {
  public resourceUrl = SERVER_API_URL + 'api/promos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/promos';

  constructor(protected http: HttpClient) {}

  create(promo: IPromo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(promo);
    return this.http
      .post<IPromo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(promo: IPromo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(promo);
    return this.http
      .put<IPromo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPromo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPromo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPromo[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(promo: IPromo): IPromo {
    const copy: IPromo = Object.assign({}, promo, {
      start: promo.start != null && promo.start.isValid() ? promo.start.format(DATE_FORMAT) : null,
      end: promo.end != null && promo.end.isValid() ? promo.end.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.start = res.body.start != null ? moment(res.body.start) : null;
      res.body.end = res.body.end != null ? moment(res.body.end) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((promo: IPromo) => {
        promo.start = promo.start != null ? moment(promo.start) : null;
        promo.end = promo.end != null ? moment(promo.end) : null;
      });
    }
    return res;
  }
}
