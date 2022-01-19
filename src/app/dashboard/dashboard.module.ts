import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboadComponent } from './admin-dashboad/admin-dashboad.component';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../core/material.modute';


@NgModule({
  declarations: [AdminDashboadComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
