import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EachClass, EachClassCreate } from './model';


const Api_location = environment.base_api_url + '/school/class';
const school_api_location = environment.base_api_url + '/school/';

@Injectable({
  providedIn: 'root'
})
export class ClassesServiceService {

  constructor(private httpClient: HttpClient) {

  }

  createClasses(body: EachClassCreate): Observable<EachClass> {
    return this.httpClient.post<EachClass>(Api_location, body);
  }
  getClassesOfoneSchool(id: string): Observable<EachClass[]> {
    return this.httpClient.get<EachClass[]>(school_api_location + id + '/class');
  }

  getOneClassDetailsById(id: string): Observable<EachClass> {
    return this.httpClient.get<EachClass>(Api_location + '/' + id + '/details');
  }
}
