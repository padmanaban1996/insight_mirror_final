import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from './school.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  openAddNewSchool() {
    this.router.navigate(['superAdmin', 'school', 'create']);
  }

}
