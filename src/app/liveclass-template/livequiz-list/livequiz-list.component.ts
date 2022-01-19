import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Quiz } from 'src/app/quiz/model/quiz';
import { QuizResultsService } from 'src/app/quiz/quiz-results.service';
import { QuizService } from 'src/app/quiz/quiz.service';

@Component({
  selector: 'app-livequiz-list',
  templateUrl: './livequiz-list.component.html',
  styleUrls: ['./livequiz-list.component.css']
})
export class LivequizListComponent implements OnInit {

  searchByTitle: string;

  active: number;
  quizLength: number = null;
  selectedid: string;
  loggedInUser: User;
  quizAttendedByUser: boolean;
  participantId: string;
  loading: boolean = true;
  Activity = []
  isClosed: boolean;
  selected: boolean[] = []
  @Input() quizlists: Quiz[] = [];
  @Output() selectedQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();
  temp = [];
  constructor(
    private quizService: QuizService,
    public router: Router,
    private localUserService: LocalUserService


  ) {

  }

  ngOnInit(): void {
    this.loggedInUser = this.localUserService.getUser();
    this.participantId = this.loggedInUser._id;
    this.getQuiz();

    for (let i = 0; i < this.quizlists.length; i++) {

      this.selected[i] = false;

    }
  }


  onListItemClick(index: number) {
    for (let i = 0; i < this.quizlists.length; i++) {

      if (i == index) {
        this.selected[index] = !this.selected[index]
      }
      else {
        this.selected[i] = false;
      }

    }
    this.selectedid = this.quizlists[index]._id;
    this.active = index;

    this.quizService.getSingleQuiz(this.selectedid).subscribe(data => {
      console.log("quzzzz:::", data);
      this.selectedQuiz.emit(data);
    })

  };




  //get data from the api
  getQuiz() {
    this.loading = true;
    if (this.loggedInUser.role == 'student') {
      this.quizService.getAllQuizBySchool(this.loggedInUser.belongs_to_school).subscribe(
        data => {
          this.quizlists = data;
          this.quizLength = data.length;
        }
      )
    } else {
      this.quizService.getQuizByTeacher(this.loggedInUser._id).subscribe(
        data => {
          console.log(data);

          this.quizlists = data;
          this.temp = [...this.quizlists];
          this.quizLength = data.length;
        })

    }

  }
  //route to newquiz and open
  openAddNewQuiz() {
    this.router.navigate(['livequiz', 'quiz', 'create']);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.quizlists = temp;
  }
}
