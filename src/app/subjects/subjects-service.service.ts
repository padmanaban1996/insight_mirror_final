import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubjectCreate, Subject } from './model';



const school_api_location = environment.base_api_url + '/school/';


@Injectable({
  providedIn: 'root'
})
export class SubjectsServiceService {

  constructor(private httpClient: HttpClient) { }
  createSubjects(id: string, body: SubjectCreate): Observable<string[]> {

    return this.httpClient.post<string[]>(school_api_location + id + '/subject', body);
  }
  getSubjectsOfoneSchool(id: string): Observable<string[]> {
    return this.httpClient.get<string[]>(school_api_location + id + '/subject');
  }
}
