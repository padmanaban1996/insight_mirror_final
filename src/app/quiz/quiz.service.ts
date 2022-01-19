import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionResult } from './model/question-result';
import { Quiz, QuizPaginated } from './model/quiz';

const Api_location = environment.base_api_url + '/quiz';
const quizStateApiLocation = environment.base_api_url + '/quiz/quiz_state/';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  singlequizquestions: Array<any> = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  getQuizByTeacher(id: string): Observable<Quiz[]> {
    return this.httpClient.get<Quiz[]>(Api_location + '/teacher/' + id);
  }
  getSingleQuiz(id: String): Observable<Quiz> {
    return this.httpClient.get<Quiz>(Api_location + '/' + id)
  }
  getAllQuizBySchool(schoolId: string): Observable<Quiz[]> {
    return this.httpClient.get<Quiz[]>(Api_location + '/school/' + schoolId)
  }
  getQuizByStudent(userId: string): Observable<Quiz[]> {
    return this.httpClient.get<Quiz[]>(Api_location + "/student/" + userId)
  }

  createQuiz(body: Quiz): Observable<Quiz> {
    // quiz.service.ts: 32: 14
    return this.httpClient.post<Quiz>(Api_location + '/create', body);
  }
  teacherStarted(quizId: string, starts_at: string): Observable<Quiz> {
    const body = {
      starts_at: starts_at
    }
    return this.httpClient.put<Quiz>(quizStateApiLocation + quizId + "/quiz/sessionStarted/", body);
  }
  teacherEnded(quizId: string, ends_at: string): Observable<Quiz> {
    const body = {
      ends_at: ends_at
    }
    return this.httpClient.put<Quiz>(quizStateApiLocation + quizId + "/quiz/sessionEnded/", body);
  }
  updateQuiz(quizId: string, body): Observable<Quiz> {
    return this.httpClient.put<Quiz>(Api_location + '/update/' + quizId, body)
  }
  deleteQuiz(quizId: string): Observable<Quiz> {
    return this.httpClient.delete<Quiz>(Api_location + '/delete/' + quizId)
  }
}
