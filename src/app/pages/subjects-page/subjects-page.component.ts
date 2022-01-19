import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { subjectAddButton, subjectCreateTitle, subjectPageTitle } from 'src/app/constants';

@Component({
  selector: 'app-subjects-page',
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.css']
})
export class SubjectsPageComponent implements OnInit {

  refresh_subjects;
  subjectCreateTitle: string
  subjectPageTitle: string
  subjectAddButton: string
  constructor(private modalService: NgbModal) {
    this.subjectCreateTitle = subjectCreateTitle
    this.subjectPageTitle = subjectPageTitle
    this.subjectAddButton = subjectAddButton
  }

  ngOnInit(): void {


  }
  //modal  logics
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'subjects-create' });
  }

  //modal : close when the timer runs out
  modalClose(e) {
    console.warn('modal close');

  }
  // admins list refresh
  onSaveDataRefreshSubjects(e: boolean) {
    this.refresh_subjects = e;
    this.modalService.dismissAll();
  }
}
