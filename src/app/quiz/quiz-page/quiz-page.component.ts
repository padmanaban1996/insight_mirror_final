import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { quizAddButton, quizPageTitle } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  quizPageTitle: string
  quizAddButton: string
  loggedInUser: User;
  participantId: string;

  constructor(
    public router: Router,
    private localUserService: LocalUserService,
  ) {
    this.loggedInUser = this.localUserService.getUser();
    this.participantId = this.loggedInUser._id;
    this.quizAddButton = quizAddButton
    this.quizPageTitle = quizPageTitle
  }

  ngOnInit(): void { }
  //route to newquiz and open
  openAddNewQuiz() {
    this.router.navigate(['livequiz', 'quiz', 'create']);
  }


}
