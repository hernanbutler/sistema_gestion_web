import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { RqActivity, RsActivities } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private _http: HttpService) {}

  create(body: RqActivity): Observable<any> {
    return this._http.post('/v1/api/activity', body);
  }

  activity(id: any): Observable<RsActivities> {
    return this._http.get('/v1/api/activity/' + id);
  }

  activities(): Observable<any> {
    return this._http.get('/v1/api/activity');
  }

  update(id: any, body: any): Observable<any> {
    return this._http.patch('/v1/api/activity/' + id, body);
  }

  delete(id: any): Observable<any> {
    return this._http.delete('/v1/api/activity/' + id);
  }
}
