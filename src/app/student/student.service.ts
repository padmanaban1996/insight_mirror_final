import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentCreate, StudentUser } from './model/student';

const user_Api_location = environment.base_api_url + '/user/';
// dont have two api location seperate and put in appropriate files.
// choose which is best: to seperate and routing, services,
// modules with components as seperate which is reusable and connected with service. 
// make pages which has only components and this has routing.
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createStudent(body: StudentCreate): Observable<StudentUser> {
    return this.httpClient.post<StudentUser>(user_Api_location, body);
  }
  getStudents(schoolId: string): Observable<StudentUser[]> {
    return this.httpClient.get<StudentUser[]>(user_Api_location + schoolId + '/student')
  }
  saveManyStudents(body: StudentCreate[]): Observable<StudentUser[]> {
    return this.httpClient.post<StudentUser[]>(user_Api_location + '/student/upload', body)
  }
  getSingleStudent(id: string): Observable<StudentUser> {
    return this.httpClient.get<StudentUser>(user_Api_location + '/singleuser/' + id)
  }

}
