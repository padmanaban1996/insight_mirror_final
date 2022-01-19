import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { MaterialModule } from '../core/material.modute';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from './admin.service';
import { AdminListComponent } from './admin-list/admin-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReusableComponentsModule } from '../components/reusable.module';
import { CoreModule } from '../core/core.module';
import { DataTablesModule } from 'angular-datatables';
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';


@NgModule({
  declarations: [AdminCreateComponent, AdminListComponent, AdminPageComponent, AdminDetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ReusableComponentsModule,
    CoreModule,
    DataTablesModule,
  ],
  exports: [AdminCreateComponent, AdminListComponent, AdminPageComponent, AdminDetailsComponent],
  providers: [AdminService]
})
export class AdminModule { }
