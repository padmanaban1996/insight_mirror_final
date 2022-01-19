import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Participant, singleQuestionAnswer, singleStudentAnswerSheet } from 'src/app/liveclass-template/model';
import { Questions } from 'src/app/questions/model/questions';
import { QuestionsService } from 'src/app/questions/questions.service';
import { Quiz } from '../model/quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiztest',
  templateUrl: './quiztest.component.html',
  styleUrls: ['./quiztest.component.css']
})
export class QuiztestComponent implements OnInit {
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
  newMessage: string = '';
  quiz = {} as Quiz;
  i: number = 0;
  singleQuestionAnswer = {} as singleQuestionAnswer;
  allStudentsAnswer: any = [];
  user: User
  participants = [];
  endQuiz: boolean;
  reattempt: boolean;
  embededVideos: any[] = [];
  yt_iframe_html: any;
  showQuiz: boolean = false;
  constructor(public activatedRoute: ActivatedRoute,
    private quizservice: QuizService,
    private router: Router,
    public socket: Socket,
    private localUserService: LocalUserService,
    private embedService: EmbedVideoService,
    private tosterService: ToastrService) {
    this.quiz = this.router.getCurrentNavigation().extras.state.quiz;
    this.reattempt = this.router.getCurrentNavigation().extras.state.reattempt
    console.log("test quiz", this.quiz);
    this.user = this.localUserService.getUser();
    console.log(this.reattempt);
  }
  ngOnInit(): void {


    if (this.quiz.videos.length == 0) {
      this.showQuiz = true
    }
    this.quiz.videos.forEach(element => {
      this.embededVideos.push({ id: YouTubeGetID(element.video) })

    });
    function YouTubeGetID(url) {
      url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];

    }
  };


  ngAfterViewInit() { }


  startQuiz() {
    this.showQuiz = true
  }

}