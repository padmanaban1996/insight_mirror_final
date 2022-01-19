import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { MaterialModule } from '../core/material.modute';
import { GetPasswordComponent } from './get-password/get-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolModule } from '../school/school.module';


@NgModule({
  declarations: [SuperAdminComponent, GetPasswordComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SchoolModule,
    MaterialModule,
  ]
})
export class SuperAdminModule { }
