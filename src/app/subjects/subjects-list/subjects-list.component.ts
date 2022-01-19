import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { subjectError, subjectTableHead } from 'src/app/constants';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { SubjectsServiceService } from '../subjects-service.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css']
})
export class SubjectsListComponent implements OnInit {
  loading: boolean = true;
  subjects: string[];
  schoolId: string
  subjectslength: number;
  subjectError: string
  subjectTableHead: string;
  @Input() refresh_subjects = false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private subjecService: SubjectsServiceService,
    private localUserService: LocalUserService,
    private router: Router,
    private modalService: NgbModal) {
    this.subjectTableHead = subjectTableHead
    this.subjectError = subjectError
  }
  ngOnChanges() {
    if (this.refresh_subjects == true) {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });


    }
  }

  ngOnInit(): void {
    this.schoolId = this.localUserService.getUser().belongs_to_school;
    this.getData();
    // data table options
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 10,
      dom: 'iPfrtp',
      searching: true,
      language: {
        "search": "",
        searchPlaceholder: "Search...",
        info: "_TOTAL_ Subjects Found",
        infoEmpty: "0 Subjects Found",
      }
    };
  }

  getData() {
    this.subjecService.getSubjectsOfoneSchool(this.schoolId).subscribe(data => {
      this.subjects = data;
      this.subjectslength = this.subjects.length
      console.log(this.subjectslength);

      this.loading = false;
      this.dtTrigger.next();
    })
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'my-class' });
  }

  //modal : close when the timer runs out
  modalClose(e) {
    console.warn('modal close');

  }

}
