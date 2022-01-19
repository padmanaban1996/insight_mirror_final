import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { duration } from 'moment';
import { Toast, ToastrService } from 'ngx-toastr';
import { JwtService } from 'src/app/core/services/jwt.service';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Questions } from 'src/app/questions/model/questions';
import { QuestionsService } from 'src/app/questions/questions.service';
import { quizListUrl, SingleStudentQuizResultUrl } from 'src/app/route-urls';
import { QuestionResult } from '../model/question-result';
import { checkIfStudenHasResult } from '../model/quiz-results';
import { QuizResultsService } from '../quiz-results.service';
import { QuizService } from '../quiz.service';

interface MyAnswer {
  userName: string,
  answers: [{
    question: string,
    answered: boolean
  }]

}
@Component({
  selector: 'app-quiz-host',
  templateUrl: './quiz-host.component.html',
  styleUrls: ['./quiz-host.component.css']
})

export class QuizHostComponent implements OnInit {
  quizTestForm: FormGroup;
  question: Questions;
  questionsList: [];
  answerOption: Array<String> = [];
  singleQuestionid: string;
  answer: Array<string> = [];
  notAnswered: Array<boolean> = [];
  i;
  @Output() answered: EventEmitter<boolean> = new EventEmitter()
  title: String;
  active: Number;
  timeInSeconds: number;
  timer;
  noQuestions: number;
  qnProgress: number;
  timerObj: {
    t1: {
      config: {
        leftTime: number,
        format: 'ss',
      }
    }
  }
  isLastQuestion: boolean;
  quizId: string = '';
  participantId: string;
  myAnswer: MyAnswer;
  questionResults: Array<QuestionResult> = [];
  body = {} as checkIfStudenHasResult

  constructor(
    public activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private quizResultService: QuizResultsService,
    public route: Router) {
    this.activatedRoute.queryParams.subscribe((data) => {
      const recievedQuestion = JSON.parse(data.questions);
      this.questionsList = recievedQuestion;
      this.quizId = data.quizId;
      this.i = 0
      this.question = recievedQuestion[this.i];


    });

  }

  ngOnInit(): void {

  }

  onSave() {

    this.increamentQuestion();

  }
  optionClick(e: string) {


    if (e == this.question.correctAnswer) {
      this.snackbar.open("correct answer", "success", { duration: 3000 })
    } else {
      this.snackbar.open("wrong answer", "failed", { duration: 3000 })
    }
    //move to next question
    //save in local array and send to array of what he answered

  }



  increamentQuestion() {
    if (this.i >= this.questionsList.length || this.i === this.questionsList.length - 1) {

    } else {
      this.i = this.i + 1
      this.question = this.questionsList[this.i];

    }
  }

  //    for jumbled answer options
  //   //  Fisher–Yates shuffle algorithm
  //   shuffleArray(array) {
  //     var m = array.length, t, i;

  //     // While there remain elements to shuffle
  //     while (m) {
  //       // Pick a remaining element…
  //       i = Math.floor(Math.random() * m--);

  //       // And swap it with the current element.
  //       t = array[m];
  //       array[m] = array[i];
  //       array[i] = t;
  //     }
  //     return array;
  //   }
}
