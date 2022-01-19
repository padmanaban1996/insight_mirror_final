import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse, User } from '../model/user';
const user_Api_location = environment.base_api_url + '/user/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private httpClient: HttpClient) { }

  login(body: User): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.base_api_url}/user/login`, body);
  }

  forgotPassword(body: { email: string }): Observable<{ msg: string }> {
    return this.httpClient.post<{ msg: string }>(`${environment.base_api_url}/user/forgotPassword`, body);
  }

  resetPasswordSave(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${body.token}`
      })
    }
    return this.httpClient.post(`${environment.base_api_url}/user/resetPassword`, { pwd: body.pwd, id: body.id },
      httpOptions)
  }
  updateUser(id: string, body): Observable<any> {
    return this.httpClient.put<any>(user_Api_location + '/updateuser/' + id, body)
  }
  deleteSingleUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(user_Api_location + '/deleteuser/' + id)
  }


}
