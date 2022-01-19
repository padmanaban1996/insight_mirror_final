import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImAlertComponent } from './im-alert.component';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminSubscritionExpireComponent } from '../admin/admin-subscription-expair.component.ts/admin-subscription-expire.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [ImAlertComponent, AdminSubscritionExpireComponent,
    PageNotFoundComponent,
    ConfirmationDialogComponent],
  imports: [
    CommonModule,
    NgbModule,

  ],
  exports: [
    ImAlertComponent, PageNotFoundComponent,
  ]
})
export class ReusableComponentsModule { }
