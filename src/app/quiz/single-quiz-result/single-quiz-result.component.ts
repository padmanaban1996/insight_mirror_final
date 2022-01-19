import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import { Color, Label, MultiDataSet, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { Subject } from 'rxjs';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Quiz } from '../model/quiz';
import { checkIfStudenHasResult } from '../model/quiz-results';
import { QuizResultsService } from '../quiz-results.service';

@Component({
  selector: 'app-single-quiz-result',
  templateUrl: './single-quiz-result.component.html',
  styleUrls: ['./single-quiz-result.component.css']
})
export class SingleQuizResultComponent implements OnInit {
  overallScore: number
  body: checkIfStudenHasResult
  id: string;
  doughnutChartOptions: any = { cutoutPercentage: 70, responsive: true, legend: { display: true, position: 'bottom', fullWidth: false, }, }
  public doughnutChartLabels: any[] = ['Attended'];
  public doughnutChartLabel: any[] = ['Class average'];
  public doughnutChartData: any = [];
  public doughnutChartData1: any = [];
  public doughnutChartType: ChartType = 'doughnut';
  colors: any[] = [
    {
      backgroundColor: [
        'rgb(255, 99, 132)'
      ]
    }
  ];
  user: User;
  quizResults: any = [];
  quiz: Quiz;
  classAverage: number;
  quizQuestions: any = [];
  constructor(private activatedRoute: ActivatedRoute,
    private quizResultsService: QuizResultsService,
    private localUserService: LocalUserService,
    private router: Router,
    private _location: Location) {
    console.log("quiz", this.router.getCurrentNavigation().extras.state.quiz);
    this.quiz = this.router.getCurrentNavigation().extras.state.quiz;
    this.user = this.localUserService.getUser();
    console.log(this.quiz.participants.length);

  }
  ngOnInit(): void {
    this.quizResultsService.getOverallQuizResultByQuizId(this.quiz._id).subscribe(data => {
      console.log(data);
      this.quizResults = data;
      this.quizQuestions = data.result
      var sum = 0;
      for (let index = 0; index < this.quizResults.result.length; index++) {
        console.log(this.quizResults.result[index].percent);
        sum += this.quizResults.result[index].percent;
      }
      var numbersCnt = this.quiz.participants.length;
      this.classAverage = Math.round((sum / numbersCnt));
      this.doughnutChartData1 = []
      this.doughnutChartData1.push(this.classAverage, 100 - this.classAverage)
      console.log(this.quizResults);
      const notattended = this.quiz.participants.length - data.result.length
      this.doughnutChartData = []
      this.doughnutChartData.push(this.quizResults.result.length, notattended);
    })

  }
  onListItemClick(i) {
    console.log(i);
    this.router.navigate([`livequiz/quiz/student_result/${this.quiz._id}`, i])
  }
  exit() {
    this.router.navigate(['livequiz/schedule/list'])

  }


}
