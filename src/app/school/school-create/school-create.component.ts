import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SchoolService } from '../school.service';
@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit {

  schoolCreateForm: FormGroup;
  schoolContactPersonForm: FormGroup;
  adminSaveSuccess: boolean;
  schoolId: string;
  isloading: boolean;

  constructor(private fb: FormBuilder,
    private router: Router,
    private schoolService: SchoolService,
    private matSnackBar: MatSnackBar
  ) {
    this.isloading = true;

  }


  ngOnInit(): void {
    this.initForm();


  }
  onSubmit() {

    const schoolDetails = this.schoolCreateForm.value;
    schoolDetails.contact_person = this.schoolContactPersonForm.value;
    //every user created by super admin will have first free plan
    schoolDetails.subscriptionPlan = 1;
    this.schoolService.createSchool(schoolDetails).subscribe(data => {
      if (data._id) {

        this.matSnackBar.open("School created", "Success", { duration: 2000 })
        this.schoolId = data._id;
        this.isloading = false;
      } else {

      }
    })


  }


  private initForm() {
    this.schoolCreateForm = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      address: this.fb.group({
        line1: [''],
        locality: [''],
        city: [''],

      }),
      subscriptionPlan: [''],
      pincode: [''],
      contact_person: ['']
    })

    this.schoolContactPersonForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile_number: ['', [Validators.required]]
    })

  }


}
