import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { RsUser, RsUsers } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private _http: HttpService) {}

  activity(id: any): Observable<RsUser> {
    return this._http.get('/v1/api/activity/' + id);
  }

  activities(): Observable<any> {
    return this._http.get('/v1/api/activity');
  }
}
