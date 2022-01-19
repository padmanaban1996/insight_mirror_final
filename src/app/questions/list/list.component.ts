import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Questions } from '../model/questions';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  questions: Questions[];
  title: String;
  active: Number;
  selectedid: String;
  questionsLength: Number;
  closeResult = '';
  loading: boolean = true;

  @ViewChild('singleQuestionModal') singleQuestionModal: ElementRef;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private questionService: QuestionsService,
    private modalService: NgbModal,
    public router: Router,
    private localUserService: LocalUserService
  ) { }

  ngOnInit(): void {
    this.getQuestions();
    // data table options
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 10,
      dom: 'Pfrtip',
      searching: true,
      language: {
        "search": "",
        searchPlaceholder: "Search...",
        info: "_TOTAL_ Quizzes Found",
        infoEmpty: "0 Quizzes Found",

      }
    };
  }

  onListItemClick(index: number) {
    this.active = index;

    //open modal and send the value of id to that
    this.selectedid = this.questions[index]._id;

    this.open(this.singleQuestionModal);
  }

  getQuestions() {
    this.loading = true;
    this.questionService.getQuestions(this.localUserService.getUser()._id).subscribe(
      data => {
        this.questions = data;
        this.questionsLength = data.length;
        this.loading = false;
      }
    )
  }

  //open add new router
  openAddNewQuestions() {
    this.router.navigate(['livequiz', 'questions', 'create'])
  }

  //search logics
  // searchTitle(): void {
  //   this.questionService.findByTitle(this.title)
  //     .subscribe(
  //       data => {
  //         this.tutorials = data;
  //         data);
  //       },
  //       error => {
  //         error);
  //       });
  // }

  //modal logics
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //modal : close when the timer runs out
  modalClose(e) {
    console.warn('modal close');

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

}
