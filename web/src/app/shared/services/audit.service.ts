import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { RsUser, RsUsers } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  constructor(private _http: HttpService) {}

  audit(id: any): Observable<RsUser> {
    return this._http.get('/v1/api/audit/' + id);
  }

  audits(): Observable<any> {
    return this._http.get('/v1/api/audit');
  }
}
