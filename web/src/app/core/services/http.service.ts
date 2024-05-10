import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  get(url: string): Observable<any> {
    return this._http.get(url);
  }

  post(url: string, body: any): Observable<any> {
    return this._http.post(url, body);
  }

  path(url: string, body: any): Observable<any> {
    return this._http.patch(url, body);
  }

  delete(url: string): Observable<any> {
    return this._http.delete(url);
  }
}
