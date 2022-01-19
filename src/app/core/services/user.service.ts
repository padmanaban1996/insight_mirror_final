import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student, User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  //check other user whether they are filtered by school

  //users By school
  getAllUsers(schoolId: string): Observable<User[]> {
    const api: string = `${environment.base_api_url}/user/school/${schoolId}`;

    return this.httpClient.get<User[]>(api);
  }

  //create service for subscription and move there and have seperate model
  payForSubscription(body: { amount: number }) {
    return this.httpClient.post<any>(environment.base_api_url + '/user/subscription', body)
  }
}
