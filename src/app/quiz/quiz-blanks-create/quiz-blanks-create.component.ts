import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { addQuestionBUtton, inputQuestionPlaceholder } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { QuestionsService } from 'src/app/questions/questions.service';

@Component({
  selector: 'app-quiz-blanks-create',
  templateUrl: './quiz-blanks-create.component.html',
  styleUrls: ['./quiz-blanks-create.component.css']
})
export class QuizBlanksCreateComponent implements OnInit {

  newQuestionForm: FormGroup;
  singleSelect: boolean = true;
  sec: number = 60;
  user: User;
  public selectedCorrectAnswer: string = '';
  newQuestionErrorMsg: string
  inputQuestionPlaceholder: string
  option1Placeholder: string
  option2Placeholder: string
  option3Placeholder: string
  option4Placeholder: string
  addQuestionBUtton: string

  @Output() onQuestionCreateData: EventEmitter<any> = new EventEmitter<any>();
  radioStatus: boolean = false;




  constructor(
    private questionservice: QuestionsService,
    public router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private toster: ToastrService,
    private localUserService: LocalUserService
  ) {
    this.user = this.localUserService.getUser();

    this.inputQuestionPlaceholder = inputQuestionPlaceholder

    this.addQuestionBUtton = addQuestionBUtton
  }

  ngOnInit(): void {
    this.newQuestionForm = this.fb.group({

      title: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      createdBy: ['']
    });

  }





  onSubmit() {

    const value = this.newQuestionForm.value;
    value.createdBy = this.user._id;
    value.qtype = 'blanks'
    // value.seconds = this.sec
    console.log(this.newQuestionForm.controls);
    console.log(value);

    this.questionservice.createQuestion(value).subscribe(
      data => {
        this.onQuestionCreateData.emit(data);
        this.toster.success("Question added", "success", { timeOut: 3000 })
      }
    )
    this.reset()
  }
  get f() {
    return this.newQuestionForm.controls;

  }
  reset() {

    this.newQuestionForm.reset();
    this.radioStatus = false;
  }

}
