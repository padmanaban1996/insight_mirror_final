import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AdminService } from '../admin.service';
import { AdminUser } from '../model';

@Component({
    selector: 'app-admin-details',
    templateUrl: './admin-details.component.html',
    styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {
    @Input() id: String;
    adminDetails: any = []
    adminMobile: any;
    showCase: boolean = false;
    @Output() refresh_admins: EventEmitter<boolean> = new EventEmitter();
    constructor(private adminService: AdminService,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private authService: AuthService,
        private matSnackBar: MatSnackBar,
        private router: Router) { }
    ngOnInit(): void {
        console.log(this.id);
        this.getSingleAdminDetails(this.id);
    }
    getSingleAdminDetails(id) {
        this.adminService.getSingleAdmin(id).subscribe(data => {
            this.adminDetails = data
            this.adminMobile = this.adminDetails._admin.mobile_number;
        })
    }
    editUser() {
        this.showCase = true
    }
    deleteUser() {
        this.confirmationDialogService.confirm('Please confirm..', `Do you really want to delete ${this.adminDetails.name} ?`)
            .then((confirmed) => {
                if (confirmed) {
                    console.log("clicked okay", confirmed);
                    this.refresh_admins.emit(true);
                    this.authService.deleteSingleUser(this.adminDetails._id).subscribe(data => {
                        console.log(data);

                        this.matSnackBar.open(data.message, 'success', {
                            duration: 2000, verticalPosition: 'top', horizontalPosition: "right"
                        });
                    })
                    this.modalService.dismissAll();
                    this.router.navigate(['livequiz/settings/page/student/list'])
                }
            })
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
    updateUser() {
        this.adminDetails._admin.mobile_number = this.adminMobile
        this.authService.updateUser(this.adminDetails._id, this.adminDetails).subscribe(data => {
            console.log(data);
            this.matSnackBar.open(data.message, 'success', {
                duration: 2000, verticalPosition: 'top', horizontalPosition: "right",
            });
            this.modalService.dismissAll();
        },
            error => {
                this.matSnackBar.open(error.error.message, 'undo', {
                    duration: 2000, verticalPosition: 'top', horizontalPosition: "right",
                });
                this.modalService.dismissAll();
            })
    }
}