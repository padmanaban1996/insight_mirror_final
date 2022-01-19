import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolCreateComponent } from './school-create/school-create.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolComponent } from './school.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.modute';
import { AdminModule } from '../admin/admin.module';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';
import { ClassesModule } from '../classes/classes.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReusableComponentsModule } from '../components/reusable.module';


@NgModule({
  declarations: [SchoolCreateComponent, SchoolListComponent, SchoolComponent, SchoolSettingsComponent],
  //only when we export the component we can reuse in the another module when we import
  exports: [SchoolCreateComponent, SchoolListComponent, SchoolComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    ClassesModule,
    SubjectsModule,
    ReusableComponentsModule,
    FlexLayoutModule


  ]
})
export class SchoolModule { }
