import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlatform } from 'app/shared/model/platform.model';

type EntityResponseType = HttpResponse<IPlatform>;
type EntityArrayResponseType = HttpResponse<IPlatform[]>;

@Injectable({ providedIn: 'root' })
export class PlatformService {
  public resourceUrl = SERVER_API_URL + 'api/platforms';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/platforms';

  constructor(protected http: HttpClient) {}

  create(platform: IPlatform): Observable<EntityResponseType> {
    return this.http.post<IPlatform>(this.resourceUrl, platform, { observe: 'response' });
  }

  update(platform: IPlatform): Observable<EntityResponseType> {
    return this.http.put<IPlatform>(this.resourceUrl, platform, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlatform>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlatform[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlatform[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
