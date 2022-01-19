import { ChangeDetectorRef, Component, EventEmitter, Injectable, Input, OnInit, Output, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { quizCurrectAnswer, quizStudentMessage1, quizStudentMessage2, quizStudentMessage3, quizWrongAnswer } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Questions } from 'src/app/questions/model/questions';
import { Iquestion, Quiz } from 'src/app/quiz/model/quiz';
import { QuizResultsService } from 'src/app/quiz/quiz-results.service';
import { singleStudentAnswerSheet } from '../model';
import 'rxjs/add/operator/map';
declare var LeaderLine: any;
@Injectable()

@Component({
  selector: 'app-livequiz-student',
  templateUrl: './livequiz-student.component.html',
  styleUrls: ['./livequiz-student.component.css'],

})
export class LivequizStudentComponent implements OnInit {

  newQuestionForm: FormGroup;
  @Output() studentActions: EventEmitter<any> = new EventEmitter<any>();
  // if it returns something mention type below and send from parent. functional input
  // @Input() currenctAction: (args: any) => void;
  answerOption: string;
  selectedValue: string;
  rightAnswercount: number = 0;
  wrongAnswerCount: number = 0;
  // match the followings
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

  correctAnswers = [];
  filteredMatchesAnswers = [];

  @Input() currentQuestionData = {} as Iquestion;
  @Input() start: boolean;
  @Input() next: boolean;
  @Input() end: boolean;
  @Input() showResults: boolean;
  @Input() chartData;
  @Input() optionsAndFrequency = {}
  @Input() studentsAnswers = [] as singleStudentAnswerSheet[];
  @Input() scheduleId: string = '';
  @Input() seconds: number;
  answer: string;
  answered = false;
  user: User;
  rightAnswer: boolean = null;
  currentValue = '';
  currentSubscription: Subscription;
  isChecked = false;
  quizStudentMessage1: string;
  quizStudentMessage2: string;
  quizStudentMessage3: string;
  quizCurrectAnswer: string;
  quizWrongAnswer: string;
  config: any;
  constructor(
    private toastService: ToastrService, private changeDetector: ChangeDetectorRef, private localUserService: LocalUserService, private quizResultsService: QuizResultsService) {
    this.user = this.localUserService.getUser();
    this.quizStudentMessage1 = quizStudentMessage1
    this.quizStudentMessage2 = quizStudentMessage2
    this.quizStudentMessage3 = quizStudentMessage3
    this.quizCurrectAnswer = quizCurrectAnswer
    this.quizWrongAnswer = quizWrongAnswer
  }

  ngOnInit(): void {
    console.log("scheduleId", this.scheduleId);
    this.quizResultsService.getQuizResultsInLiveClass(this.scheduleId).subscribe(data => {
      console.log("from service", data);
      if (data == []) {
        // this.quizResults = null
      } else {
        for (let i = 0; i < data.length; i++) {
        }
      }
    }, err => console.error("", err));
  }


  ngOnChanges() {
    this.answered = false;
    console.log("current question data", this.currentQuestionData);
    this.clear();
    console.log("CALLED");
    this.config = { leftTime: this.seconds, format: 'mm:ss' };
    console.log("SEC", this.seconds)
    this.isChecked = false
    console.log(this.start, this.next, this.end);
    if (this.end = true) {
      console.log("student Ans ==>", this.studentsAnswers);
    }
  }
  ngOnDestroy() {

  }
  clear(): void {
    var ele = document.getElementsByName("radio");
    for (var i = 0; i < ele.length; i++) {
      var element = ele[i] as HTMLInputElement;
      element.checked = false;
    }
    this.answer = null
  }

  optionClick(selectedIndex: string, e: string) {
    this.answered = true;
    this.isChecked = true;
    let result: string;
    if (selectedIndex == this.currentQuestionData.correctAnswer) {
      result = "Right"
      this.rightAnswer = true;
      this.rightAnswercount++
      // this.toastService.success(this.quizCurrectAnswer)
    } else {
      result = "Wrong"
      this.rightAnswer = false;
      this.wrongAnswerCount++
      // this.toastService.warning(this.quizWrongAnswer)
    }
    let obj = {
      id: this.user._id,
      title: this.currentQuestionData.title,
      answer: result,
      selectedIndex,
      optionSelected: e,
      qtype: this.currentQuestionData.qtype
    }
    this.studentActions.emit(JSON.stringify(obj))
    this.answered = false;
    this.rightAnswer = null;
  }
  onSubmit(selectedIndex) {
    this.answered = true;
    if (this.currentQuestionData.qtype === 'matches') {
      this.currentQuestionData.matchfollow.correctAnswers.forEach(element => {
        delete element['_id']
        this.filteredMatchesAnswers.push(element)
      });
      const result = this.filteredMatchesAnswers.filter(o => this.correctAnswers.some(({ opt, ans }) => o.opt === opt && o.ans === ans));
      console.log(result);
      let results: string
      if (result.length === 4) {
        this.rightAnswer = true;
        results = "Right"
        this.rightAnswercount++
      } else {
        this.rightAnswer = false;
        this.wrongAnswerCount++
        results = "Wrong"
      }
      let obj = {
        id: this.user._id,
        title: this.currentQuestionData.title,
        answer: results,
        selectedIndex,
        optionSelected: '',
        matchAnsOption: this.correctAnswers,
        correctMatchAns: this.filteredMatchesAnswers,
        qtype: this.currentQuestionData.qtype
      }
      this.studentActions.emit(JSON.stringify(obj))
      this.clearLines();
      // this.answered = false;
      this.rightAnswer = null;
    }
    else {
      let result: string
      if (this.answer != null) {
        if (this.answer == this.currentQuestionData.correctAnswer.toLowerCase()) {
          result = "Right"
          this.rightAnswer = true;
          this.rightAnswercount++
        } else {
          result = "Wrong"
          this.rightAnswer = false;
          this.wrongAnswerCount++
        }
        let obj = {
          id: this.user._id,
          title: this.currentQuestionData.title,
          answer: result,
          selectedIndex,
          optionSelected: this.answer,
          qtype: this.currentQuestionData.qtype
        }
        this.studentActions.emit(JSON.stringify(obj))
        this.rightAnswer = null;
      }
    }
  }
  // match the followings leader lines
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

      positionByWindowResize: true,
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
      this.savedMappings[this.mappedIndex].line.setOptions({ dashed: true });
      console.log('hi');
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
  clearLines() {
    const cols = document.querySelectorAll('.leader-line');
    cols.forEach(data => {
      (data as HTMLElement).style.display = 'none';
    });
    this.savedMappings = []
    this.filteredMatchesAnswers = []
    this.correctAnswers = []
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
      this.savedMappings[this.mappedIndex].line.setOptions({ color: 'red' });
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