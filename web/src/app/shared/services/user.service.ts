import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { RsUser, RsUsers } from '@shared/models';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpService, private _data: DataService) {}

  user(id: any): Observable<RsUser> {
    return this._http.get('/v1/api/auth/' + id);
  }

  users(): Observable<RsUsers> {
    return this._http.get('/v1/api/auth');
  }

  updateUser(body: any): Observable<any> {
    const id = this._data.getUser.id;
    return this._http.path(`/v1/api/auth/${id}`, body);
  }
}
