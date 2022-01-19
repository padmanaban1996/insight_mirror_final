import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addQuestionBUtton, inputQuestionPlaceholder, newQuestionErrorMsg, option1Placeholder, option2Placeholder, option3Placeholder, option4Placeholder } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Questions } from 'src/app/questions/model/questions';
import { QuestionsService } from 'src/app/questions/questions.service';

@Component({
  selector: 'app-quiz-reading-comprehension',
  templateUrl: './quiz-reading-comprehension.component.html',
  styleUrls: ['./quiz-reading-comprehension.component.css']
})
export class QuizReadingComprehensionComponent implements OnInit {
  undo: boolean = false;
  newQuestionForm: FormGroup;
  questions: FormArray;
  singleSelect: boolean = true;
  sec: number = 60;
  paragraph: string;
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
  temp: any;
  constructor(
    private questionservice: QuestionsService,
    public router: Router,
    private fb: FormBuilder,
    private toster: ToastrService,
    private matSnackBar: MatSnackBar,
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
    this.newQuestionForm = new FormGroup({
      questions: new FormArray([])
    });
    this.addQuestion()
  }
  createItem(): FormGroup {
    return this.fb.group({
      paragraph: this.paragraph,
      title: ['', Validators.required],
      a: ['', Validators.required],
      b: ['', Validators.required],
      c: ['', Validators.required],
      d: ['', Validators.required],
      qtype: ['comprehension'],
      correctAnswer: [''],
      createdBy: this.user._id
    });
  }
  addQuestion(): void {
    console.log("called");
    this.questions = this.newQuestionForm.get('questions') as FormArray;
    this.questions.push(this.createItem());
  }

  onSubmit() {
    this.newQuestionForm.value.questions[0].paragraph = this.paragraph;
    const value = this.newQuestionForm.value.questions;
    console.log(value);
    value.forEach(element => {
      this.questionservice.createQuestion(element).subscribe(
        data => {
          this.onQuestionCreateData.emit(data);
          this.toster.success("Question added", "success", { timeOut: 3000 })
        }
      )
    });
    this.reset()
  }
  get f() {
    return this.newQuestionForm.controls;

  }
  reset() {

    this.newQuestionForm.reset();
    this.radioStatus = false;
    this.paragraph = null
  }
  optionClick(e: string) {
    this.selectedCorrectAnswer = e;
  }
  deletelistQuestion(i) {
    console.log(i);
    const remove = this.newQuestionForm.get('questions') as FormArray;
    this.temp = remove.at(i);
    remove.removeAt(i);
    this.undo = false;
    console.log("temp::", this.temp);
    // let snackBarRef = this.matSnackBar.open("Question deleted successfully.", 'Undo', {
    //   duration: 3000
    // });
    // snackBarRef.onAction().subscribe(() => {
    //   console.log('undo');
    //   remove.insert(i, this.temp)
    //   this.undo = true;
    // });
  }
}
