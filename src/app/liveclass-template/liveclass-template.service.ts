import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Schedule } from '../schedule/model/schedule';
import { UserActivity } from './model';

const userActivityApiLocation = environment.base_api_url + '/schedule/user_activity/';
const scheduleApiLocation = environment.base_api_url + '/schedule/';
const roomStateAPiLocation = environment.base_api_url + '/schedule/room_state/';

@Injectable({
  providedIn: 'root'
})
export class LiveclassTemplateService {

  constructor(private httpClient: HttpClient) { }



  sendUserActivity(scheduleId: string, body: UserActivity): Observable<UserActivity[]> {
    return this.httpClient.post<UserActivity[]>(userActivityApiLocation + scheduleId, body);
  }
  sendPinStatus(scheduleId: string, pin_status: boolean): Observable<UserActivity[]> {
    const body = {
      pin_status: pin_status
    }
    return this.httpClient.put<any>(roomStateAPiLocation + scheduleId + "/schedule/pinStatus/", body);
  }
  sendUnpinStatus(scheduleId: string, pin_status: boolean): Observable<UserActivity[]> {
    const body = {
      pin_status: pin_status
    }
    return this.httpClient.put<any>(roomStateAPiLocation + scheduleId + "/schedule/unpinStatus/", body);
  }

  teacherJoined(scheduleId: string, starts_at: string): Observable<Schedule> {
    const body = {
      starts_at: starts_at
    }
    return this.httpClient.put<Schedule>(roomStateAPiLocation + scheduleId + "/schedule/sessionStarted/", body);
  }
  sessionEnded(scheduleId: string, ends_at: string): Observable<Schedule> {
    // session ended = true
    const body = {
      ends_at
    }
    console.error("schedule is", scheduleId);

    return this.httpClient.put<Schedule>(roomStateAPiLocation + scheduleId + "/schedule/sessionEnded/", body);
  }

}
