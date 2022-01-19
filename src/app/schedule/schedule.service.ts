import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Attendance, PartcipantActivity, Schedule, ScheduleCreate } from './model/schedule';

const Api_location = environment.base_api_url + '/schedule/';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createSchedule(body: ScheduleCreate): Observable<Schedule> {
    return this.httpClient.post<Schedule>(Api_location, body);
  }
  getSchedules(schoolId: string, id: string): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(Api_location + schoolId + "/" + id);
  }
  deleteOneSchedule(id: string) {

    return this.httpClient.delete(Api_location + id);
  }
  saveAttendance(body: Attendance[], id: string): Observable<Schedule> {
    return this.httpClient.put<Schedule>(Api_location + id + '/attendance', body)
  }
}
