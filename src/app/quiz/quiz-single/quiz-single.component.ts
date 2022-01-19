import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClassesServiceService } from 'src/app/classes/classes-service.service';
import { EachClass, EachClassStudent } from 'src/app/classes/model';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { QuestionsService } from 'src/app/questions/questions.service';
import { Iquestion, Quiz } from '../model/quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-single',
  templateUrl: './quiz-single.component.html',
  styleUrls: ['./quiz-single.component.css']
})
export class QuizSingleComponent implements OnInit {
  singleSelect: boolean = true;
  user: User;
  newVideoLinkForm: FormGroup
  public selectedCorrectAnswer: string = '';
  fileToUpload: any;
  imageUrl: any;
  subjects: any[] = ["Maths", "Chemistry", "Physics", "Biology", "Geography", "Computer", "English", "History"];
  questionsForm: FormGroup;
  questions: FormArray;
  @ViewChild('mcq4Modal') mcq4modal: ElementRef;
  @ViewChild('mcq2Modal') mcq2modal: ElementRef;
  @ViewChild('blanksModal') blankModal: ElementRef;
  @ViewChild('picMcqModal') picMcqModal: ElementRef;
  @ViewChild('matches') matches: ElementRef;
  @ViewChild('paragraphModal') paragraphModal: ElementRef;
  @ViewChild('comprehensionModal') comprehensionModal: ElementRef;
  @Output() onQuizUpdate = new EventEmitter;
  radioStatus: boolean = false;
  imageSrc: any;
  classesList: EachClass[] = [];
  classCheck: boolean[] = [];
  participantsSelected: EachClassStudent[] = [];
  imageOption1Src: any;
  imageOption2Src: any;
  imageOption3Src: any;
  imageOption4Src: any;
  showPictures: boolean;
  showOptions: boolean = true;
  quizName: string;
  quizSubject: string;
  quizQuestions: any[] = [];
  classesIdList: string[];
  quizData: Quiz;
  questionModel: any;
  id: string;
  closeResult: string;
  showQuestionOptions = [];

  undo: boolean;
  temp: Iquestion;
  quizVideos: any[] = [];
  scheduled: boolean;
  color: ThemePalette = 'primary';
  constructor(
    private questionservice: QuestionsService,
    public router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private quizService: QuizService,
    private localUserService: LocalUserService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public confirmationDialogService: ConfirmationDialogService,
  ) {
    this.user = this.localUserService.getUser();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getSingleQuizQuestions(this.id);
    this.initForm();
    this.videoForm();
  }
  initForm() {
    this.questionsForm = new FormGroup({
      questions: new FormArray([])
    });
  }
  videoForm() {
    this.newVideoLinkForm = this.fb.group({
      video: ['', Validators.required],
    });
  }
  pushVideoLink() {
    console.log("called");
    const value = this.newVideoLinkForm.value
    this.quizVideos.push(value);
    this.newVideoLinkForm.reset()
  }
  createQuestion(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      a: ['', Validators.required],
      b: ['', Validators.required],
      c: ['', Validators.required],
      d: ['', Validators.required],
      correctAnswer: [''],
      createdBy: this.user._id,
      qtype: ['', Validators.required]
    });
  }
  deletelistQuestion(i) {
    console.log(i);
    this.undo = false;
    this.temp = this.quizData.questions[i];
    this.quizData.questions.splice(i, 1)
    let snackBarRef = this.snackbar.open("Question deleted successfully.", 'Undo', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('undo');
      this.quizData.questions.splice(i, 0, this.temp);
      this.undo = true;
    });
  }
  uploadQuestions(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'question-upload', centered: true })
  }
  uploadedQuestions(event) {
    console.log(event);
    event.forEach(element => {
      this.quizQuestions.push(element)
    });
  }
  deleteVideo(i) {
    console.log(i);
    this.undo = false;
    this.temp = this.quizData.videos[i];
    this.quizData.videos.splice(i, 1)
    let snackBarRef = this.snackbar.open("Video Link deleted successfully.", 'Undo', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('undo');
      this.quizData.videos.splice(i, 0, this.temp);
      this.undo = true;
    });
  }
  onCancel() {
    this.router.navigate(['livequiz/quiz/list'])
  }
  toggle(event: MatSlideToggleChange) {
    console.log('toggle', event.checked);
    this.scheduled = event.checked;
  }
  showQuestionOptionsByIndex(i) {
    this.showQuestionOptions[i] = !this.showQuestionOptions[i]
  }

  deleteQuiz() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this quiz ?')
      .then((confirmed) => {
        if (confirmed) {
          this.quizService.deleteQuiz(this.quizData._id).subscribe(data => {
            console.log(data);
            this.onQuizUpdate.emit(true);
            this.toastr.success(data.message);
            this.router.navigate(['livequiz/quiz/list'])
          }, error => {
            this.toastr.warning(error.error.message)
          })
        }
      })
      .catch(() => console.log("user canceled quiz delete."));
  }

  getCreatedQuestion(data) {
    console.log("emitted!", data);
    this.quizData.questions.push(data);
  }

  updateQuiz() {
    this.questionsForm.value.questions.forEach(element => {
      console.log(element);
      this.quizData.questions.push(element)
    });
    this.quizData.name = this.quizName
    this.quizData.subject = this.quizSubject
    this.quizData.scheduled = this.scheduled
    this.quizService.updateQuiz(this.id, this.quizData).subscribe(data => {
      console.log(data);
      this.onQuizUpdate.emit(true);
      this.toastr.success(data.message);
      this.router.navigate(['livequiz/quiz/list'])
    }, error => {
      this.toastr.warning(error.error.message)
    })
  }
  onSelectSubject(e) {
    console.log(e);
    this.quizSubject = e
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'question-add', }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onSelectQuestionType(event) {
    console.log(event);
    switch (event) {
      case event = 'mcq4':
        console.log("mcq4");
        this.open(this.mcq4modal)
        break;
      case event = 'mcq2':
        console.log("mcq2");
        this.open(this.mcq2modal)
        break;
      case event = 'blanks':
        console.log("blanks");
        this.open(this.blankModal)
        break;
      case event = 'picmcq':
        console.log("picmcq");
        this.open(this.picMcqModal)
        break;
      case event = 'matches':
        console.log("matches");
        this.open(this.matches)
        break;
      case event = 'paragraph':
        console.log("paragraph");
        this.open(this.paragraphModal)
        break;
      case event = 'comprehension':
        console.log("comprehension");
        this.open(this.comprehensionModal)
        break;
      default:
        break;
    }
  }
  ClearField() {
    this.quizName = ''
  }
  getSingleQuizQuestions(id) {
    this.quizService.getSingleQuiz(id).subscribe(data => {
      console.log('single', data);
      this.quizData = data
      this.quizName = data.name;
      this.quizSubject = data.subject;
      this.scheduled = data.scheduled
      console.log("scheduled", this.scheduled);

      if (this.quizSubject == undefined) {
        this.quizSubject = "none";
      }
      this.quizQuestions = data.questions;
      this.quizVideos = data.videos
      for (let index = 0; index < this.quizQuestions.length; index++) {
        this.showQuestionOptions.push(false)
      }
    })
  }
  optionClick(e: string) {
    this.selectedCorrectAnswer = e;
    console.log(e);
  }
  openAddvideo(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'video-link-add', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onFileInput(event, i) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.quizQuestions[i].image = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionOneInput(event, i) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.quizQuestions[i].a = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionTwoInput(event, i) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.quizQuestions[i].b = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionThreeInput(event, i) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.quizQuestions[i].c = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionFourInput(event, i) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.quizQuestions[i].d = reader.result;
      reader.readAsDataURL(file);
    }
  }
}

