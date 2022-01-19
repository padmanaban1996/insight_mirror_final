import { Component, EventEmitter, Input, OnInit, Output, Pipe, ViewChild } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { Questions } from '../model/questions';
import { CountdownEvent } from 'ngx-countdown';
import { Quiz } from 'src/app/quiz/model/quiz';
import { QuizService } from 'src/app/quiz/quiz.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent implements OnInit {

  answerOption: Array<String> = [];

  @Input() selectedQuiz: Quiz[] = [];
  @Input() id: String;
  @Input() quizData = {} as Quiz;
  @Output() modalClose: EventEmitter<any> = new EventEmitter();
  timeInSeconds: Number = 0;
  time: { leftTime: 0 }

  Quizquestions: Quiz[] = [];
  questionsLength: number = null;
  questions: any;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  quizName: string;
  constructor(private questionService: QuestionsService, private quizservice: QuizService) { }

  ngOnInit(): void {


    this.getSingleQuizQuestions(this.id);
    // data table options
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 10,
      dom: 'Pfrtip',
      searching: true,
      language: {
        "search": "",
        searchPlaceholder: "Search...",
        info: "showing _END_ out of _TOTAL_ Questions Found",
        infoEmpty: "0 Questions Found",
      },
      oLanguage: {
        "oPaginate": {
          "sFirst": "First", // This is the link to the first page
          "sPrevious": "<i class='fa fa-arrow-left' aria-hidden='true'></i>", // This is the link to the previous page
          "sNext": "<i class='fa fa-arrow-right' aria-hidden='true'></i>", // This is the link to the next page
          "sLast": "Last" // This is the link to the last page
        }
      }
    };
  }
  //calls the get function from service
  getSingleQuizQuestions(id) {
    this.quizservice.getSingleQuiz(id).subscribe(data => {
      console.log('single', data);

      this.quizName = data.name
      this.Quizquestions.push(data as unknown as Quiz);
      this.dtTrigger.next();
    })
  }

}
