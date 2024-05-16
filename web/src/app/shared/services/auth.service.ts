import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import {
  RqLoginUser,
  RqRegisterUser,
  RsLoginUser,
  RsRegisterUser,
} from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpService) {}

  login(body: RqLoginUser): Observable<RsLoginUser> {
    return this._http.post('/v1/api/auth/login', body);
  }

  register(body: RqRegisterUser): Observable<RsRegisterUser> {
    return this._http.post('/v1/api/auth/register', body);
  }
}
