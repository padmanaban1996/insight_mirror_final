import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { singleStudentAnswerSheet } from '../liveclass-template/model';
import { QuestionResult } from './model/question-result';
import { checkIfStudenHasResult, checkIfStudentAttended, QuizResult } from './model/quiz-results';

const Api_location = environment.base_api_url + '/quiz_results';
const quiz_api_loction = environment.base_api_url + '/exam_results';
const reattempt_quiz_api_locaion = environment.base_api_url + '/reattempt_results';
@Injectable({
  providedIn: 'root'
})
export class QuizResultsService {

  constructor(private httpClient: HttpClient) { }

  saveQuizResultInLiveClass(body: { answers: any[], quizName: string, currentQuizId: string }, id: string) {
    return this.httpClient.post(Api_location + '/' + id, body)
  }
  saveQuizResultsInQuizModule(body: { answerSheet: any[], quizName: string }, id: string) {
    console.log(body);
    return this.httpClient.post(quiz_api_loction + '/create/' + id, body)
  }
  saveReattemptQuizResultsInQuizModule(body: { answerSheet: any[], quizName: string }, id: string) {
    console.log(body);
    return this.httpClient.post(reattempt_quiz_api_locaion + '/create/' + id, body)
  }
  getQuizResultsInLiveClass(id: string): Observable<singleStudentAnswerSheet[]> {
    return this.httpClient.get<singleStudentAnswerSheet[]>(Api_location + '/' + id)
  }
  getOverallQuizResultByQuizId(id: string) {
    return this.httpClient.get<any>(environment.base_api_url + '/exam_results/getPercentage/' + id);
  }
  getSingleStudentQuizResults(quizId: string, studentId: string) {
    return this.httpClient.get<any>(environment.base_api_url + '/exam_results/getPerStudent/' + quizId + '/' + studentId);
  }
  getSingleStudentReattemptQuizResults(quizId: string, studentId: string) {
    return this.httpClient.get<any>(reattempt_quiz_api_locaion + '/getPerStudent/' + quizId + '/' + studentId);
  }
  getQuizResultByQuizId(id: string) {
    return this.httpClient.get<any>(environment.base_api_url + '/quiz_results/getPercentage/' + id);
  }
  getSingleStudentQuizResultsByScheduleId(scheduleId: string, studentId: string) {
    return this.httpClient.get<any>(environment.base_api_url + '/quiz_results/getPerStudent/' + scheduleId + '/' + studentId);
  }



}
