import { Component, OnInit } from '@angular/core';
import { SchoolDetails } from '../model';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  loading: boolean = true;
  schools: SchoolDetails[];
  schoolsLength: number = null;
  constructor(private schoolService: SchoolService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.schoolService.getSchools().subscribe(data => {
      this.schools = data;
      this.schoolsLength = this.schools.length
      this.loading = false
    })
  }

}
