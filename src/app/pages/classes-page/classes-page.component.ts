import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { classAddButton, classCreateTitle, classesPageTitle } from 'src/app/constants';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrls: ['./classes-page.component.css']
})
export class ClassesPageComponent implements OnInit {

  refresh_classes;
  classesPageTitle: string
  classAddButton: string
  classCreateTitle: string;
  constructor(private modalService: NgbModal) {
    this.classAddButton = classAddButton
    this.classesPageTitle = classesPageTitle
    this.classCreateTitle = classCreateTitle
  }

  ngOnInit(): void {


  }
  //modal  logics
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'class-create', centered: true });
  }

  //modal : close when the timer runs out
  modalClose(e) {
    console.warn('modal close');

  }
  // admins list refresh
  onSaveDataRefreshClasses(e: boolean) {
    this.refresh_classes = e;
    this.modalService.dismissAll()
  }
}
