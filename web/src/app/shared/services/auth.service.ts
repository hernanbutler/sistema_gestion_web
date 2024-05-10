import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { RqLoginUser, RsLoginUser } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpService) {}

  login(body: RqLoginUser): Observable<RsLoginUser> {
    return this._http.post('/v1/api/auth/login', body);
  }

  authenticated() {}
}
