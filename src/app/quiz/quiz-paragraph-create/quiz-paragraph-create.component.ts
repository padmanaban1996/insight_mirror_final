import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addQuestionBUtton, inputQuestionPlaceholder, newQuestionErrorMsg, option1Placeholder, option2Placeholder, option3Placeholder, option4Placeholder } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Questions } from 'src/app/questions/model/questions';
import { QuestionsService } from 'src/app/questions/questions.service';

@Component({
  selector: 'app-quiz-paragraph-create',
  templateUrl: './quiz-paragraph-create.component.html',
  styleUrls: ['./quiz-paragraph-create.component.css']
})
export class QuizParagraphCreateComponent implements OnInit {

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

  @Output() onQuestionCreateData: EventEmitter<Questions> = new EventEmitter<Questions>();
  radioStatus: boolean = false;




  constructor(
    private questionservice: QuestionsService,
    public router: Router,
    private fb: FormBuilder,
    private toster: ToastrService,
    private snackbar: MatSnackBar,
    private localUserService: LocalUserService
  ) {
    this.user = this.localUserService.getUser();
    this.newQuestionErrorMsg = newQuestionErrorMsg
    this.inputQuestionPlaceholder = inputQuestionPlaceholder
    this.option1Placeholder = option1Placeholder
    this.option2Placeholder = option2Placeholder
    this.option3Placeholder = option3Placeholder
    this.option4Placeholder = option4Placeholder
    this.addQuestionBUtton = addQuestionBUtton
  }

  ngOnInit(): void {
    this.newQuestionForm = this.fb.group({
      correctAnswer: ['', Validators.required],
      title: ['', Validators.required],
      createdBy: ['']
    });
  }
  onSubmit() {
    const value = this.newQuestionForm.value;
    value.createdBy = this.user._id;
    value.qtype = 'paragraph'
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
