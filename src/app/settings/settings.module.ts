import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '../core/material.modute';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassesModule } from '../classes/classes.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { AdminThemeModule } from '../admin-theme/admin-theme-module';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    //check whether the below two needed
    ClassesModule,
    SubjectsModule,
    SubscriptionModule,
    AdminThemeModule
  ]
})
export class SettingsModule { }
