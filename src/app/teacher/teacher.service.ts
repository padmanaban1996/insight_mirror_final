import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../core/model/user';

import { TeacherCreate, TeacherUser } from './model';

const User_Api_location = environment.base_api_url + '/user/';
const Api_location = environment.base_api_url + '/user/teachers/';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createTeacherUser(body: TeacherCreate): Observable<TeacherUser> {
    return this.httpClient.post<TeacherUser>(User_Api_location, body);
  }

  saveManyTeachers(body: TeacherUser[]) {
    return this.httpClient.post(environment.base_api_url + '/user/teachers/upload', body);
  }

  // service with observable return type can be directly map to variable in the html
  getteachers(schoolId): Observable<User[]> {
    //below function returns the data directly which reduced the code
    // rewrite like below after v1
    // 'get teachers service called ');
    // const responseObj = this.httpClient.get<User[]>(Api_location);
    // let user: Array<User>;
    // responseObj.subscribe(data => {
    //   user = data
    // })
    // "user data from service", user);
    // return user;
    return this.httpClient.get<User[]>(User_Api_location + schoolId + '/teachers/')
  }
  getSingleTeacher(id: string): Observable<TeacherUser> {
    return this.httpClient.get<TeacherUser>(User_Api_location + '/singleuser/' + id)
  }
}
