import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addQuestionBUtton } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Questions } from 'src/app/questions/model/questions';
import { QuestionsService } from 'src/app/questions/questions.service';
declare var LeaderLine: any;
@Component({
  selector: 'app-quiz-matches',
  templateUrl: './quiz-matches.component.html',
  styleUrls: ['./quiz-matches.component.css']
})
export class QuizMatchesComponent {
  //throwaway
  newQuestionForm: FormGroup;
  addQuestionBUtton: string;
  @Output() onQuestionCreateData: EventEmitter<any> = new EventEmitter<any>();
  mapping = [];
  mapping2 = [];
  mappedObj = {};
  mappedObj2 = {};
  selection;
  selection2;
  mapped: boolean = false;

  savedMappings = [];
  mappedStandardMetrics = {};
  mappedFinancialModelMetrics = {};
  currentClickSM: string; //the element id
  currentClickFMM: string;
  selectedSM: string;
  selectedFMM: string;

  wasRedraw = false;
  globalLine = null;
  option1;
  option2;
  option3;
  option4;
  answer1;
  answer2;
  answer3;
  answer4;
  user: User;
  correctAnswers = [];


  constructor(private questionservice: QuestionsService,
    public router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private localUserService: LocalUserService,
    private toster: ToastrService) {
    this.user = this.localUserService.getUser();
    this.addQuestionBUtton = addQuestionBUtton
  }
  ngOnInit(): void {
    this.newQuestionForm = this.fb.group({
      title: ['', Validators.required],
      oa: ['', Validators.required],
      ob: ['', Validators.required],
      oc: ['', Validators.required],
      od: ['', Validators.required],
      a: ['', Validators.required],
      b: ['', Validators.required],
      c: ['', Validators.required],
      d: ['', Validators.required],
    });
  }
  ngOnDestroy() {
    this.clear()
  }
  optionLeft = [];
  optionRight = []
  onSubmit() {
    const data = {
      matchfollow: {
        optionLeft: [],
        optionRight: [],
        correctAnswers: []
      }
    } as any
    data.qtype = 'matches';
    data.title = this.newQuestionForm.value.title;
    data.matchfollow.optionLeft = this.optionLeft;
    data.matchfollow.optionRight = this.optionRight;
    data.matchfollow.correctAnswers = this.correctAnswers
    this.optionLeft.push(this.newQuestionForm.value.oa)
    this.optionLeft.push(this.newQuestionForm.value.ob)
    this.optionLeft.push(this.newQuestionForm.value.oc)
    this.optionLeft.push(this.newQuestionForm.value.od)
    this.optionRight.push(this.newQuestionForm.value.a)
    this.optionRight.push(this.newQuestionForm.value.b)
    this.optionRight.push(this.newQuestionForm.value.c)
    this.optionRight.push(this.newQuestionForm.value.d)
    data.createdBy = this.user._id;
    console.log(data);
    this.questionservice.createQuestion(data).subscribe(
      data => {
        this.onQuestionCreateData.emit(data);
        this.toster.success("Question added", "success", { timeOut: 3000 })
      }
    )
    this.newQuestionForm.reset();
    this.clear()
  }
  get f() {
    return this.newQuestionForm.controls;
  }
  mappedIndex;
  selectionWasMapped(id) {
    for (let i = 0; i < this.savedMappings.length; i++) {
      if (this.savedMappings[i].mapping === id) {
        this.mappedIndex = i;
        return true;
      }
    }
  }

  selectionWasMapped2(id) {
    for (let i = 0; i < this.savedMappings.length; i++) {
      if (this.savedMappings[i].mapping2 === id) {
        this.mappedIndex = i;
        return true;
      }
    }
  }

  el;

  leader(id, id2) {
    let startEl = document.getElementById(id);
    let endEl = document.getElementById(id2);

    return new LeaderLine(startEl, endEl, {
      endPlugOutline: false,
      animOptions: { duration: 3000, timing: 'linear' }
    });
  }

  doSomething(el: HTMLElement) {
    this.el = el.id;
    this.el2 = undefined;

    if (this.mapped) {
      this.selection = undefined;
      this.selection2 = undefined;
      this.mapped = false;
    }
    if (this.selectionWasMapped(el.id)) {
      this.savedMappings[this.mappedIndex].line.remove();
      this.savedMappings.splice(this.mappedIndex, 1);
      this.correctAnswers.splice(this.mappedIndex, 1)
    } else if (this.selection === el.id) {
      this.el = '';

      this.selection = '';
    } else {
      this.selection = el.id;
    }

    if (this.isMapped()) {
      //save
      //mark mapped
      let l = this.leader(this.selection, this.selection2);
      this.mappedObj[this.selection] = true;
      this.mappedObj2[this.selection2] = true;
      this.save(l);
    }
  }

  save(l) {
    this.savedMappings.push({
      mapping: this.selection,
      mapping2: this.selection2,
      line: l
    });
    this.correctAnswers.push({
      opt: this.selection,
      ans: this.selection2,
    })
    console.log(this.savedMappings);
  }
  isMapped() {
    this.mapped = this.selection && this.selection2;
    return this.mapped;
  }
  clear() {
    const cols = document.querySelectorAll('.leader-line');
    cols.forEach(data => {
      (data as HTMLElement).style.display = 'none';
    });
    this.savedMappings = []
  }
  el2;
  doSomething2(el2: HTMLElement) {
    this.el2 = el2.id;
    this.el = undefined;
    if (this.mapped) {
      this.selection = undefined;
      this.selection2 = undefined;
      this.mapped = false;
    }
    console.log(el2.id);
    if (this.selectionWasMapped2(el2.id)) {
      this.savedMappings[this.mappedIndex].line.remove();
      this.savedMappings.splice(this.mappedIndex, 1);
      this.correctAnswers.splice(this.mappedIndex, 1)
    } else if (this.selection2 === el2.id) {
      this.el2 = '';
      this.selection2 = '';
    } else {
      this.selection2 = el2.id;
    }
    if (this.isMapped()) {
      let l = this.leader(this.selection, this.selection2);
      this.mappedObj[this.selection] = true;
      this.mappedObj2[this.selection2] = true;

      this.save(l);
    }
  }
}