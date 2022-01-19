import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartType } from 'chart.js';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { QuizService } from 'src/app/quiz/quiz.service';
import { QuizResultsService } from 'src/app/quiz/quiz-results.service';
@Component({
  selector: 'app-student-livequiz-result',
  templateUrl: './student-livequiz-result.component.html',
  styleUrls: ['./student-livequiz-result.component.css']
})
export class StudentliveQuizResultComponent implements OnInit {
  @Input() studentId
  @Input() resultQuizId
  @Input() selectedQuizId
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,

      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: false
  }

  overallScore: number
  user: User;
  closeResult = '';
  quizResults: any;
  studentPercent: number;
  id: string;

  public doughnutChartLabels: any[] = ['Correct', 'Wrong', 'Skipped'];
  public doughnutChartData: any = [];
  public doughnutChartType: ChartType = 'doughnut';
  colors: any[] = [
    {
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ]
    }
  ];
  public doughnutChartPlugins: any[] = [];
  studentAnswers: any;
  filteredCorrectQuestionsList: any = [];
  filteredWrongtQuestionsList: any = [];
  filteredSkippedQuestionsList: any = [];
  doughnutChartOptions: any = {
    cutoutPercentage: 70, responsive: true,

  }
  totalQuestions: any;

  totalStudents: number;
  studentRank: number;
  progressWidth: number;
  yt_iframe_html: any;
  videos: any[];
  embededVideos: any[] = [];
  @Output() routeBackAction: EventEmitter<any> = new EventEmitter<any>();
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private quizResultsService: QuizResultsService,
    private localUserService: LocalUserService,
    private modalService: NgbModal,
    private embedService: EmbedVideoService
  ) {

    this.user = this.localUserService.getUser();
  }
  ngOnInit(): void {
    console.log(this.resultQuizId, this.studentId);
    this.quizService.getSingleQuiz(this.selectedQuizId).subscribe(data => {
      console.log(data);
      this.videos = data.videos
      data.videos.forEach(element => {
        console.log(element.video);
        this.yt_iframe_html = this.embedService.embed(element.video, {
          query: { portrait: 0, color: '333' },
          attr: { width: 400, height: 200 }
        });
        this.embededVideos.push({ frame: this.yt_iframe_html })
        console.log(this.embededVideos);
      });
      this.totalStudents = data.participants.length
      console.log(this.totalStudents);
    })
    this.quizResultsService.getSingleStudentQuizResultsByScheduleId(this.resultQuizId, this.studentId).subscribe(data => {
      console.log(data);
      data.forEach(element => {
        console.log(element);
        this.studentRank = element.rank
        console.log(this.studentRank);
        this.studentAnswers = element.value.userDetails.answerSheet
        console.log(this.studentAnswers);
        this.totalQuestions = this.studentAnswers.length
        this.studentPercent = element.value.percent;
        console.log(this.studentPercent);
      });
      this.filterList();
    })
    setTimeout(() => {
      this.progressWidth = Math.round((this.studentRank / this.totalStudents) * 100);
      console.log("width", this.progressWidth, this.studentRank, this.totalStudents);
    }, 3000);
  }
  filterList() {
    this.filteredCorrectQuestionsList = this.studentAnswers.filter(item => item.answer === 'Right')
    console.log(this.filteredCorrectQuestionsList);
    this.filteredWrongtQuestionsList = this.studentAnswers.filter(item => item.answer === 'Wrong')
    console.log(this.filteredWrongtQuestionsList);
    this.filteredSkippedQuestionsList = this.studentAnswers.filter(item => item.answer === '')
    console.log(this.filteredSkippedQuestionsList);
    console.log(this.filteredCorrectQuestionsList.length, this.filteredWrongtQuestionsList.length, this.filteredSkippedQuestionsList.length);
    this.doughnutChartData.push(this.filteredCorrectQuestionsList.length, this.filteredWrongtQuestionsList.length, this.filteredSkippedQuestionsList.length)
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'question-add', }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  exit() {
    this.routeBackAction.emit('exit')
  }

}
