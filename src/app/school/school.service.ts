import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SchoolDetails } from './model'
@Injectable({
  providedIn: 'root'
})

export class SchoolService {

  apiUrl = environment.base_api_url + '/school/';
  constructor(private httpClient: HttpClient) { }

  createSchool(body): Observable<SchoolDetails> {
    return this.httpClient.post<SchoolDetails>(this.apiUrl, body);
  }

  getSchools(): Observable<SchoolDetails[]> {
    return this.httpClient.get<SchoolDetails[]>(this.apiUrl);
  }

  getSingleSchoolDetails(id: string): Observable<SchoolDetails> {
    return this.httpClient.get<SchoolDetails>(this.apiUrl + id);
  }

}
