import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { TeacherService } from '../teacher.service';

@Component({
    selector: 'app-teacher-details',
    templateUrl: './teacher-details.component.html',
    styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {
    @Input() id: String;
    teacherDetails: any = []
    teacherMobile: number;
    showCase: boolean = false;
    mobile_number;
    constructor(private teacherService: TeacherService,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private authService: AuthService,
        private matSnackBar: MatSnackBar,
        private router: Router) { }
    ngOnInit(): void {
        console.log(this.id);
        this.getSingleteacherDetails(this.id);
    }
    getSingleteacherDetails(id) {
        this.teacherService.getSingleTeacher(id).subscribe(data => {
            console.log(data);
            this.teacherDetails = data
            this.teacherMobile = this.teacherDetails._teacher.mobile_number;
        })
    }
    editUser() {
        this.showCase = true
    }
    deleteUser() {
        this.confirmationDialogService.confirm('Please confirm..', `Do you really want to delete ${this.teacherDetails.name} ?`)
            .then((confirmed) => {
                if (confirmed) {
                    console.log("clicked okay", confirmed);
                    this.authService.deleteSingleUser(this.teacherDetails._id).subscribe(data => {
                        console.log(data);
                        this.matSnackBar.open(data.message, 'success', {
                            duration: 2000, verticalPosition: 'top', horizontalPosition: "right",
                        });
                    })
                    this.modalService.dismissAll();
                    this.router.navigate(['livequiz/settings/page'])
                }

            })
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
    updateUser() {
        this.teacherDetails._teacher.mobile_number = this.teacherMobile
        this.authService.updateUser(this.teacherDetails._id, this.teacherDetails).subscribe(data => {
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