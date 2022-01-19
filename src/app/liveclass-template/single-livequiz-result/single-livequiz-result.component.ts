import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import { Color, Label, MultiDataSet, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { Subject } from 'rxjs';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Quiz } from 'src/app/quiz/model/quiz';
import { QuizResultsService } from 'src/app/quiz/quiz-results.service';
import { QuizService } from 'src/app/quiz/quiz.service';

@Component({
  selector: 'app-single-livequiz-result',
  templateUrl: './single-livequiz-result.component.html',
  styleUrls: ['./single-livequiz-result.component.css']
})
export class SingleLiveQuizResultComponent implements OnInit {
  overallScore: number
  @Input() quizId;
  @Input() quizData;
  @Input() schedule;
  id: string;
  @Output() resultActions: EventEmitter<any> = new EventEmitter<any>();

  doughnutChartOptions: any = { cutoutPercentage: 70, responsive: true, legend: { display: true, position: 'bottom', fullWidth: false, } }
  public doughnutChartLabels: any[] = ['Attended'];
  public doughnutChartLabel: any[] = ['Class average'];
  public doughnutChartData: any = [];
  public doughnutChartData1: any = [];
  public doughnutChartType: ChartType = 'doughnut';
  colors: any[] = [
    {
      backgroundColor: [
        'rgb(255, 99, 132)',
      ]
    }
  ];
  user: User;
  quizResults: any = [];
  quiz: Quiz;
  classAverage: number;
  participantsData: any = [];
  quizQuestions: any = [];
  constructor(private activatedRoute: ActivatedRoute,
    private quizResultsService: QuizResultsService,
    private localUserService: LocalUserService,
    private router: Router,
    private _location: Location,
    private quizService: QuizService) {
    this.user = this.localUserService.getUser();
  }
  ngOnInit(): void {
    this.quizResultsService.getQuizResultByQuizId(this.quizId).subscribe(data => {
      console.log(data);
      this.quizResults = data;
      console.log(this.quizResults.length);
      var sum = 0;
      for (let index = 0; index < this.quizResults.length; index++) {
        console.log(this.quizResults[index].percent);
        sum += this.quizResults[index].percent;
      }
      var numbersCnt = this.schedule.participants.length;
      this.classAverage = Math.round((sum / numbersCnt));
      this.doughnutChartData1.push(this.classAverage, 100 - this.classAverage)
      const notattended = this.schedule.participants.length - data.length
      this.doughnutChartData.push(this.quizResults.length, notattended);
    })
    this.participantsData = this.quizData.answerSheet
    console.log("data", this.quizData);
    console.log("quizId", this.quizId);

    this.quizService.getSingleQuiz(this.quizData.quizId).subscribe(data => {
      console.log(data);
      this.quizQuestions = data
    })
  }
  action(action: string, id: string) {
    this.resultActions.emit({ action, id, quizId: this.quizData._id, selectedQuizId: this.quizData.quizId });
  }


}
