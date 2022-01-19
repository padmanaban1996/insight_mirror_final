import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartType } from 'chart.js';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { QuizResultsService } from '../quiz-results.service';
import { QuizService } from '../quiz.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';
import { Quiz } from '../model/quiz';
import { UserService } from 'src/app/core/services/user.service';
import { TeacherService } from 'src/app/teacher/teacher.service';
import { TeacherUser } from 'src/app/teacher/model';
import { teacherParticipentsAnswered } from 'src/app/constants';
@Component({
  selector: 'app-students-quiz-result',
  templateUrl: './students-quiz-result.component.html',
  styleUrls: ['./students-quiz-result.component.css']
})
export class StudentsQuizResultComponent implements OnInit {
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
        items: 3
      }
    },
    nav: false
  }
  customOptions2: OwlOptions = {
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
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  @ViewChild('rankList') rankList: ElementRef;
  overallScore: number
  user: User;
  closeResult = '';
  quizResults: any;
  studentPercent: number;
  id: string;
  quizQuestions: any = [];

  public doughnutChartLabels: any[] = ['Correct', 'Wrong', 'Skipped'];
  public doughnutChartLabels1: any[] = ['Percentage'];
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
  quizId: string;
  studentId: any;
  totalStudents: number;
  studentRank: number;
  progressWidth: number;
  yt_iframe_html: any;
  videos: any[];
  embededVideos: any[] = [];
  quizData: Quiz;
  reattemptData: any[] = [];
  teacherId: string;
  teacher: TeacherUser;
  studentName: any;
  className: any;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private quizService: QuizService,
    private quizResultsService: QuizResultsService,
    private localUserService: LocalUserService,
    private modalService: NgbModal,
    private teacherService: TeacherService,
    private embedService: EmbedVideoService
  ) {
    this.quizId = this.activatedRoute.snapshot.paramMap.get('id1')
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id2')
    console.log(this.quizId, this.studentId);
    this.user = this.localUserService.getUser();

    this.quizService.getSingleQuiz(this.quizId).subscribe(data => {
      console.log("quiz data", data);
      this.quizData = data

      this.teacherId = data.createdBy
      console.log(this.teacherId);
      this.teacherService.getSingleTeacher(this.teacherId).subscribe(data => {
        console.log("teacher data", data);
        this.teacher = data
        console.log(this.teacher.name);

      })
      this.videos = data.videos
      function YouTubeGetID(url) {
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];

      }
      data.videos.forEach(element => {
        console.log(element.video);

        this.embededVideos.push({ id: YouTubeGetID(element.video) })
        console.log("embeded videos", this.embededVideos);
      });
      this.totalStudents = data.participants.length
    })
  }
  ngOnInit(): void {


    this.quizResultsService.getSingleStudentQuizResults(this.quizId, this.studentId).subscribe(data => {
      data.forEach(element => {
        console.log('student', element);
        this.studentRank = element.rank;
        this.studentName = element.value.userDetails.name
        this.className = element.value.userDetails.className
        this.studentAnswers = element.value.userDetails.studentAnswerSheet
        console.log(this.studentAnswers);
        this.totalQuestions = this.studentAnswers.length
        this.studentPercent = element.value.percent;
        console.log(this.studentPercent);
      });
      setTimeout(() => {
        this.progressWidth = Math.round((this.studentRank / this.totalStudents) * 100);
        console.log("width", this.progressWidth, this.studentRank, this.totalStudents);

      }, 3000);
      this.filterList();
    })
    this.quizResultsService.getSingleStudentReattemptQuizResults(this.quizId, this.studentId).subscribe(data => {
      this.reattemptData = data;
      console.log(this.reattemptData);
    })
  }
  startQuiztoStudent(quiz) {
    this.router.navigate(['test'], { state: { quiz: quiz, reattempt: true }, skipLocationChange: true });
  }
  filterList() {
    this.filteredCorrectQuestionsList = this.studentAnswers.filter(item => item.answerOption === 'Right')
    console.log(this.filteredCorrectQuestionsList);
    this.filteredWrongtQuestionsList = this.studentAnswers.filter(item => item.answerOption === 'Wrong')
    console.log(this.filteredWrongtQuestionsList);
    this.filteredSkippedQuestionsList = this.studentAnswers.filter(item => item.answerOption === '')
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
  openRankList() {
    this.quizResultsService.getOverallQuizResultByQuizId(this.quizId).subscribe(data => {
      console.log(data);
      this.quizResults = data;
      this.quizQuestions = data.result
      var sum = 0;
      for (let index = 0; index < this.quizResults.result.length; index++) {
        console.log(this.quizResults.result[index].percent);
        sum += this.quizResults.result[index].percent;
      }
    })
    this.modalService.open(this.rankList, { ariaLabelledBy: 'New Class', windowClass: 'rank-list', centered: true })
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
    if (this.user.role != 'student') {
      this.router.navigate(['livequiz/quiz/result'], { state: { quiz: this.quizData }, skipLocationChange: true },);
    }
    else {
      this.router.navigate(['livequiz/schedule/list'])
    }
  }
}
