import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { teacherAddButton, teacherError, teacherTableHead, teacherUploadButton, teacheruploadTitle } from 'src/app/constants';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Quiz } from 'src/app/quiz/model/quiz';
import { TeacherService } from '../teacher.service';


@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})

export class teacherListComponent implements OnInit {
  teacherAddButton: string
  teacherUploadButton: string
  teacherError: string
  teacherTableHead: string
  teacheruploadTitle: string

  teachers;
  closeResult = '';
  loading: boolean;
  teacherslength: number = null;
  close_Teacher_upload_modal: boolean
  isClosed: boolean;
  schoolId: string;
  @Input() quizlists: Quiz[] = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('singleteacherModal') singleteacherModal: ElementRef;
  selectedid: any;
  constructor(private router: Router,
    private teacherservice: TeacherService, private localUserService: LocalUserService, private modalService: NgbModal) {
    this.schoolId = this.localUserService.getUser().belongs_to_school;
    this.loading;
    this.teacherAddButton = teacherAddButton
    this.teacherUploadButton = teacherUploadButton
    this.teacherError = teacherError
    this.teacherTableHead = teacherTableHead
    this.teacheruploadTitle = teacheruploadTitle
  }

  ngOnInit(): void {
    this.getteachers();
    // data table options
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 10,
      dom: 'Pfrtip',
      searching: true,
      language: {
        "search": "",
        searchPlaceholder: "Search...",
        info: "showing _END_ out of _TOTAL_ Teachers Found",
        infoEmpty: "0 Teachers Found",
      },
      oLanguage: {
        "oPaginate": {
          "sFirst": "First", // This is the link to the first page
          "sPrevious": "<i class='fa fa-arrow-left' aria-hidden='true'></i>", // This is the link to the previous page
          "sNext": "<i class='fa fa-arrow-right' aria-hidden='true'></i>", // This is the link to the next page
          "sLast": "Last" // This is the link to the last page
        }
      }
    };
  }
  getteachers() {
    this.loading = true;
    this.teacherservice.getteachers(this.schoolId).subscribe(
      data => {
        this.teachers = data
        this.teacherslength = data.length;
        this.loading = false;
        this.dtTrigger.next();
      }
    )
  }
  onListItemClick(index: number) {
    this.selectedid = this.teachers[index]._id;
    console.log(this.selectedid);
    this.open(this.singleteacherModal);
  }
  openAddNewteacher() {
    this.router.navigate(['livequiz', 'settings', 'page', 'teacher', 'create']);
  }
  // openteacherUpload() {
  //   this.router.navigate(['livequiz', 'teacher', 'upload'])
  // }
  //modal logics
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'teacher-upload', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  closeteacheruploadmodal(e) {
    this.close_Teacher_upload_modal = e;
    console.log(e)
    if (this.close_Teacher_upload_modal == true) {
      console.log("changeDetected...")
      this.modalService.dismissAll()
    }
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
