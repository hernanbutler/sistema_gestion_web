import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  get(url: string, options?: any): Observable<any> {
    return this._http.get(url, options);
  }

  post(url: string, body: any): Observable<any> {
    return this._http.post(url, body);
  }

  patch(url: string, body: any, options?: any): Observable<any> {
    return this._http.patch(url, body, options);
  }

  delete(url: string): Observable<any> {
    return this._http.delete(url);
  }
}
