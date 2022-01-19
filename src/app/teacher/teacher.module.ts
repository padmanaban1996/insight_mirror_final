import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { teacherCreateComponent } from './teacher-create/teacher-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.modute';
import { teacherListComponent } from './teacher-list/teacher-list.component';
import { teacherRoutingModule } from './teacher-routing.module';
import { TeacherService } from './teacher.service';
import { UploadTeacherComponent } from './upload-teacher/upload-teacher.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReusableComponentsModule } from '../components/reusable.module';
import { CoreModule } from '../core/core.module';
import { DataTablesModule } from 'angular-datatables';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';


@NgModule({
  declarations: [teacherCreateComponent, teacherListComponent, UploadTeacherComponent, TeacherDetailsComponent],
  exports: [teacherCreateComponent, teacherListComponent, TeacherDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    teacherRoutingModule,
    NgSelectModule,
    NgbModule,
    ReusableComponentsModule,
    CoreModule,
    DataTablesModule



  ],
  providers: [TeacherService]
})
export class teacherModule { }
