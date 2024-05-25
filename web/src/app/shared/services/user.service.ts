import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import {
  RqRegisterUser,
  RsRegisterUser,
  RsUser,
  RsUsers,
} from '@shared/models';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpService, private _data: DataService) {}

  register(body: RqRegisterUser): Observable<RsRegisterUser> {
    return this._http.post('/v1/api/user/register', body);
  }

  user(id: any): Observable<RsUser> {
    return this._http.get('/v1/api/user/' + id);
  }

  users(): Observable<RsUsers> {
    return this._http.get('/v1/api/user');
  }

  updateUser(id: number, body: any): Observable<any> {
    return this._http.patch(`/v1/api/user/${id}`, body);
  }
}
