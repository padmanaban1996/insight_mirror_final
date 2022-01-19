import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Questions } from '../model/questions';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private questionService: QuestionsService,
    public router: Router
  ) { }

  public dropDownListItems: Array<string> = ['a', 'b', 'c', 'd'];
  public selectedCorrectAnswer: string = '';
  time: NgbTimeStruct = { hour: 0, minute: 5, second: 30 };

  ngOnInit(): void {
    this.selectedCorrectAnswer = this.dropDownListItems[0];
  }
  answerSelectedValue(val) {
    this.selectedCorrectAnswer = val;
  }
  submit(val) {
    const body = new Questions();

    body.title = val.title,
      body.a = val.a,
      body.b = val.b,
      body.c = val.c,
      body.d = val.d,
      body.seconds = this.time.second,
      body.createdBy = 'sankar',
      body.correctAnswer = this.selectedCorrectAnswer

    console.warn(body);

    this.questionService.createQuestion(body).subscribe(
      data => {
        this.router.navigate(['questions', 'list'])
      }
    )
  }
}
