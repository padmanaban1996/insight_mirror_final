import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { quizResultMessage, teacherParticipentsAnswered } from 'src/app/constants';
import { Iquestion, Quiz } from 'src/app/quiz/model/quiz';
import { QuizResultsService } from 'src/app/quiz/quiz-results.service';
import { QuizService } from 'src/app/quiz/quiz.service';
import { singleStudentAnswerSheet } from '../model';

@Component({
  selector: 'app-livequiz-teacher',
  templateUrl: './livequiz-teacher.component.html',
  styleUrls: ['./livequiz-teacher.component.css']
})
export class LivequizTeacherComponent implements OnInit {

  @Output() teacherActions: EventEmitter<any> = new EventEmitter<any>();
  @Output() secondsAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() quizData = {} as Quiz;
  questionsLength = 0;
  @Input() lastQuestion: boolean;
  @Input() scheduleId: string = '';
  @Input() start: boolean;
  @Input() next: boolean;
  @Input() end: boolean;
  @Input() showResults: boolean;
  @Input() currentQuestionData = {} as Iquestion
  @Input() studentsAnswers = [] as singleStudentAnswerSheet[];
  @Input() quizName: string = null;
  @Input() seconds: number;
  @Input() noOfAnsweredStudents: number = null;
  @Input() currentQuizId: string = null
  showAnswer: boolean = false;
  dtOptions: DataTables.Settings = {};
  _object = Object;
  currentValue = '';
  currentSubscription: Subscription;
  teacherParticipentsAnswered: string;
  quizResultMessage: string;
  showSeconds: boolean;
  showAutoplay: boolean;
  autoPlay: boolean;
  mySubscription: Subscription
  secondsSelected: any;
  triggerNext: any;
  config: any;
  keys: any = [];


  constructor(private quizResultService: QuizResultsService, private changeDetector: ChangeDetectorRef, public toastr: ToastrService) {
    this.teacherParticipentsAnswered = teacherParticipentsAnswered
    this.quizResultMessage = quizResultMessage
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full',
      responsive: true,
      pageLength: 10,
      dom: 'Pfrtp',
      searching: true,
      language: {
        "search": "",
        searchPlaceholder: "Search..."
      },
    };

  }
  ngAfterViewInit() {

  }
  ngOnChanges(): void {
    console.log("last question", this.lastQuestion);
    console.log("scheduleId", this.scheduleId);


    // this.startTimer()
  }
  ngOnDestroy() {


  }
  keysFuction() {
    this.showAnswer = !this.showAnswer
  }
  saveQuizResult(answers: singleStudentAnswerSheet[]) {

    this.quizResultService.saveQuizResultInLiveClass({ answers, quizName: this.quizName, currentQuizId: this.currentQuizId }, this.scheduleId)
      .subscribe(data => {
        if (data)
          console.log(data);
        this.toastr.success(this.quizResultMessage)
      })

  }
  action(action: string) {
    if (action == 'end') {
      this.saveQuizResult(this.studentsAnswers)
    }
    if (action == 'autoplay') {
      console.log("autoplay called!");
      this.autoPlay = true
      this.secondsAction.emit(this.secondsSelected)

      // if (this.autoPlay == true) {
      //   console.log("PLAY", this.autoPlay);
      //   this.triggerNext = setInterval(() => {
      //     console.log("TRIGGERED NEXT");
      //   }, this.secondsSelected * 1000)
      // }
      setInterval(() => {
        this.action('next')
      }, this.secondsSelected * 1000);
    }
    this.teacherActions.emit(action);
  }
  change(e) {
    console.log(e);
    if (e.checked == true) {
      this.showSeconds = true
    }
    else {
      this.showSeconds = false
    }
  }
  select(e) {
    console.log(e.target.value);
    this.secondsSelected = e.target.value;
  }
  // public startTimer() {
  //   this.currentValue = this.formatValue(this.seconds);
  //   this.changeDetector.detectChanges();
  //   const t: Observable<number> = interval(1000);
  //   this.currentSubscription = t.pipe(take(this.seconds)).map(v => this.seconds - (v + 1)).subscribe(v => {
  //     this.currentValue = this.formatValue(v);
  //     this.changeDetector.detectChanges();
  //   }, err => {
  //     console.log(err);

  //   }, () => {
  //     this.currentSubscription.unsubscribe();
  //     this.currentValue = '00:00';

  //     this.changeDetector.detectChanges();
  //   });
  // }

  // formatValue(v) {
  //   const minutes = Math.floor(v / 60);
  //   const formattedMinutes = '' + (minutes > 9 ? minutes : '0' + minutes);
  //   const seconds = v % 60;
  //   const formattedSeconds = '' + (seconds > 9 ? seconds : '0' + seconds);

  //   return `${formattedMinutes}:${formattedSeconds}`;
  // }
}
