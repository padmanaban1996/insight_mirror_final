import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { duration } from 'moment';
import { ClassesServiceService } from 'src/app/classes/classes-service.service';
import { EachClass } from 'src/app/classes/model';
import { newQuestionErrorMsg } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { ResultChartComponent } from 'src/app/liveclass-template/result-chart/result-chart.component';
import { Questions } from 'src/app/questions/model/questions';
import { QuestionsService } from 'src/app/questions/questions.service';
import { Quiz } from '../model/quiz';
import { QuizResultsService } from '../quiz-results.service';
import { QuizService } from '../quiz.service';
declare var LeaderLine: any;
declare var PlainDraggable: any
@Component({
  selector: 'app-quiz-student',
  templateUrl: './quiz-student.component.html',
  styleUrls: ['./quiz-student.component.css']
})
export class QuizStudentComponent implements OnInit {

  newQuestionForm: FormGroup;
  singleSelect: boolean = true;
  sec: number = 60;
  user: User;
  @Input() quiz = {} as any;
  selectedValue: string;
  @Input() endQuiz: boolean;
  @Input() reattempt: boolean
  answerOption: string;

  public selectedCorrectAnswer: string = '';
  newQuestionErrorMsg: string
  inputQuestionPlaceholder: string
  option1Placeholder: string
  option2Placeholder: string
  option3Placeholder: string
  option4Placeholder: string
  addQuestionBUtton: string
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  answers: { questionId: any; answer: any; };
  @Output() onQuestionCreateData: EventEmitter<Questions> = new EventEmitter<Questions>();
  radioStatus: boolean = false;
  elem: any;
  id: any;
  i: number;
  show: boolean;
  hide: boolean;
  rightAnswer: boolean;
  rightAnswercount: number = 0;
  wrongAnswerCount: number = 0;
  isChecked: boolean = false;
  answer: string;
  studentAnswers: any = [];

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
  dsableSubmitButton: boolean = false;

  classDetail: EachClass;
  className: string;
  studentDetail: any;


  constructor(
    private questionservice: QuestionsService,
    public router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private quizService: QuizService,
    private localUserService: LocalUserService,
    private quizResultService: QuizResultsService,
    private classesService:ClassesServiceService
  ) {
    this.user = this.localUserService.getUser();
    this.studentDetail=this.user._student;
  }

  ngOnInit(): void {

    this.pager.count = this.quiz.questions.length;
    this.getClassName(this.studentDetail.belongs_to_class_id);
  }
  ngOnDestroy() {
    this.clearLines()
  }

  getClassName(id){
    this.classesService.getOneClassDetailsById(id).subscribe(data => {
      console.log("class detail::::",data);
      this.classDetail=data;
      this.className=this.classDetail.name;
    })
  }

  ngAfterViewInit() {
    this.wrapperPosition()
  }
  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }
  comparer(a1, a2) {
    return a1.filter(function (n) { return a2.indexOf(n) !== -1; })
  }
  goTo(index: number, i) {
    if (this.filteredQuestions[i].qtype != 'matches') {
      let results: string
      if (this.selectedValue != null || this.answer != null) {
        if (this.selectedValue == this.filteredQuestions[i].correctAnswer || this.answer == this.filteredQuestions[i].correctAnswer.toLowerCase()) {
          this.rightAnswer = true;
          results = "Right"
          this.rightAnswercount++
        } else {
          this.rightAnswer = false;
          results = "Wrong"
          this.wrongAnswerCount++
        }
      }
      else {
        results = ''
        this.wrongAnswerCount++
      }

      if (this.answerOption === null) {
        this.answerOption = this.answer
      }
      const val = {
        answerOption: results,
        correctAnswer:this.filteredQuestions[i].correctAnswer,
        questionIndex: i,
        selectedIndex: this.selectedValue,
        title: this.filteredQuestions[i].title,
        answer: this.answerOption,
        qtype:this.filteredQuestions[i].qtype
      }
      this.studentAnswers.push(val)
    }
    if (this.filteredQuestions[i].qtype === 'matches') {
      this.filteredQuestions[i].matchfollow.correctAnswers.forEach(element => {
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
      const val = {
        matchAnsOption: this.correctAnswers,
        correctMatchAns: this.filteredMatchesAnswers,
        answerOption: results,
        questionIndex: i,
        title: this.filteredQuestions[i].title,
        qtype:this.filteredQuestions[i].qtype
      }
      this.studentAnswers.push(val)
      this.clearLines()
    }

    const data = {
      rightAnswerCount: this.rightAnswercount,
      wrongAnswerCount: this.wrongAnswerCount,
      width: Math.round((index / this.quiz.questions.length) * 100)
    }
    this.clear();
    this.isChecked = false
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
    }
    if (index == this.pager.count) {
      this.show = true
      this.hide = false
    }
  }

  clear(): void {
    var ele = document.getElementsByName("radio");
    for (var i = 0; i < ele.length; i++) {
      var element = ele[i] as HTMLInputElement;
      element.checked = false;
    }
    this.answerOption = null
    this.selectedValue = null
    this.answer = null
  }

  onSubmit() {
    this.dsableSubmitButton = true
    if (this.reattempt == true) {
      const participant = this.quiz.participants.filter(item => item.studentId === this.user._id);
      this.quiz.participants.splice(this.quiz.participants.findIndex(e => e.studentId === this.user._id), 1);
      participant.forEach(element => {
        element.attended = true
        this.quiz.participants.push(element)
      });
      console.log(this.quiz.participants);
      this.quizService.updateQuiz(this.quiz._id, this.quiz).subscribe(data => {
        console.log(data);
      })
      const body = []
      body.push({
        name: this.user.name,
        id: this.user._id,
        className:this.className,
        studentAnswerSheet: this.studentAnswers
      })
      this.quizResultService.saveReattemptQuizResultsInQuizModule({ answerSheet: body, quizName: this.quiz.name }, this.quiz._id)
        .subscribe(data => {
          console.log(data);
          this.snackbar.open("Quiz Results Saved", "success", { duration: 2000 })
        })
      this.router.navigate(['livequiz/schedule/list'])

    }
    else {
      const participant = this.quiz.participants.filter(item => item.studentId === this.user._id);
      this.quiz.participants.splice(this.quiz.participants.findIndex(e => e.studentId === this.user._id), 1);
      participant.forEach(element => {
        element.attended = true
        this.quiz.participants.push(element)
      });
      console.log(this.quiz.participants);
      this.quizService.updateQuiz(this.quiz._id, this.quiz).subscribe(data => {
        console.log(data);
      })
      const body = []
      body.push({
        name: this.user.name,
        id: this.user._id,
        className:this.className,
        studentAnswerSheet: this.studentAnswers
      })
      this.quizResultService.saveQuizResultsInQuizModule({ answerSheet: body, quizName: this.quiz.name }, this.quiz._id)
        .subscribe(data => {
          console.log(data);
          this.snackbar.open("Quiz Results Saved", "success", { duration: 2000 })
        })
      this.router.navigate(['livequiz/schedule/list'])
    }

  }
  optionClick(selectedvalue: string, selectedIndex: string, e: string) {
    // this.isChecked = true;
    this.selectedValue = selectedvalue;
    this.answerOption = e
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

    const elmFrame = document.getElementById("overall");
    let startEl = document.getElementById(id);
    let endEl = document.getElementById(id2);
    const line = new LeaderLine(startEl, endEl, {

      endPlugOutline: false,
      animOptions: { duration: 3000, timing: 'linear' }
    });
    // const cols = document.querySelectorAll('.leader-line:last-of-type');
    // cols.forEach(data => {
    //   elmFrame.appendChild(data);
    // })

    elmFrame.addEventListener('scroll', function () {
      const cols = document.querySelectorAll('.leader-line:last-of-type');
      cols.forEach(data => {
        elmFrame.appendChild(data);
      })
      line.position();
    });
    return line
  }
  wrapperPosition() {
    const elmWrapper = document.getElementById("wrapper");
    elmWrapper.style.transform = 'none';
    const rect = elmWrapper.getBoundingClientRect();
    elmWrapper.style.transform = 'translate(' +
      (-(rect.left + pageXOffset)) + 'px, ' +
      (-(rect.top + pageYOffset)) + 'px)'
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
      console.log(this.savedMappings[this.mappedIndex]);

      this.savedMappings.splice(this.mappedIndex, 1);
      this.correctAnswers.splice(this.mappedIndex, 1);
      console.log('hi');
    } else if (this.selection === el.id) {
      this.el = '';

      this.selection = '';
    } else {
      this.selection = el.id;
    }

    if (this.isMapped()) {
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
