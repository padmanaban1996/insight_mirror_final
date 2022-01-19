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
  selector: 'app-quiz-picture-mcq',
  templateUrl: './quiz-picture-mcq.component.html',
  styleUrls: ['./quiz-picture-mcq.component.css']
})
export class QuizPictureMcqComponent implements OnInit {

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
  fileToUpload: any;
  imageUrl: any;
  @Output() onQuestionCreateData: EventEmitter<Questions> = new EventEmitter<Questions>();
  radioStatus: boolean = false;
  option1Url: any;
  option2Url: any;
  option3Url: any;
  option4url: any;
  imageSrc: any;
  imageOption1Src: any;
  imageOption2Src: any;
  imageOption3Src: any;
  imageOption4Src: any;
  showPictures: boolean;
  showOptions: boolean = false;
  questionType: any;


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
      image: [''],
      title: ['', Validators.required],
      a: ['', Validators.required],
      b: ['', Validators.required],
      c: ['', Validators.required],
      d: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      createdBy: [''],

    });
  }
  onFileInput(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionOneInput(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageOption1Src = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionTwoInput(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageOption2Src = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionThreeInput(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageOption3Src = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionFourInput(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageOption4Src = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onSelectQuestionCat(event: any) {
    console.log(event);
    this.questionType = event
    switch (event) {
      case 'mcq4':
        this.showOptions = true;
        this.showPictures = false

        break;
      case 'picmcq':
        this.showOptions = false;
        this.showPictures = true;
        break
    }
  }
  onSubmit() {
    const value = this.newQuestionForm.value;
    value.image = this.imageSrc
    value.createdBy = this.user._id;
    value.qtype = this.questionType
    if (this.questionType === 'picmcq') {
      value.a = this.imageOption1Src
      value.b = this.imageOption2Src
      value.c = this.imageOption3Src
      value.d = this.imageOption4Src
    }
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
    this.imageSrc = ''
    this.imageUrl = '',
      this.imageOption1Src = '',
      this.imageOption2Src = '',
      this.imageOption3Src = '',
      this.imageOption4Src = ''
  }
  optionClick(e: string) {
    this.selectedCorrectAnswer = e;
  }
}
