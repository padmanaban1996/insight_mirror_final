import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { singleStudentAnswerSheet } from 'src/app/liveclass-template/model';
import { Quiz } from '../model/quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-teacher',
  templateUrl: './quiz-teacher.component.html',
  styleUrls: ['./quiz-teacher.component.css']
})
export class QuizTeacherComponent implements OnInit {
  @Input() quiz = {} as Quiz;
  @Input() participants;
  @Input() studentsAnswers;

  QuizName: string;
  dtOptions: DataTables.Settings = {};
  _object = Object;
  questionsLength: number;
  totalParticipants: number;
  constructor(private router: Router,
    private quizservice: QuizService
  ) {

  }

  ngOnInit(): void {
    this.totalParticipants = this.quiz.participants.length;
    this.QuizName = this.quiz.name;
    this.questionsLength = this.quiz.questions.length
    console.log(this.quiz.questions.length)
    console.log(this.participants);
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
  ngOnChanges(): void {
    console.log("student Answers", this.studentsAnswers);

  } endQuiz
  endQuiztoStudent() {
    this.quizservice.teacherEnded(this.quiz._id, Date.now().toString()).subscribe(data => {
      console.log(data);
      this.router.navigate(['livequiz/schedule/list'])
    });
  }
}
