import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Questions } from './model/questions'


const Api_location = environment.base_api_url + '/questions/';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getQuestions(teacherId: string): Observable<Questions[]> {
    return this.httpClient.get<Questions[]>(Api_location + 'teacher/' + teacherId)
  }

  getOneQuestion(id: String): Observable<Questions> {
    return this.httpClient.get<Questions>(Api_location + id)
  }

  createQuestion(body: Questions): Observable<Questions> {
    return this.httpClient.post<Questions>(Api_location + "/create", body);
  }

}
