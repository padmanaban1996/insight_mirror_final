import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentService } from '../student.service';

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
    @Input() id: String;
    studentDetails: any = []
    studentMobile: number;
    parentEmail: string;
    showCase: boolean = false;
    constructor(private studentService: StudentService,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private authService: AuthService,
        private matSnackBar: MatSnackBar,
        private router: Router) { }
    ngOnInit(): void {
        console.log(this.id);
        this.getSingleStudentDetails(this.id);
    }
    getSingleStudentDetails(id) {
        this.studentService.getSingleStudent(id).subscribe(data => {
            console.log(data);
            this.studentDetails = data
            this.studentMobile = this.studentDetails._student.parent_mobile_number;
            this.parentEmail = this.studentDetails._student.parent_email_id
            console.log(this.studentMobile);
        })
    }
    editUser() {
        this.showCase = true
    }
    deleteUser() {
        this.confirmationDialogService.confirm('Please confirm..', `Do you really want to delete ${this.studentDetails.name} ?`)
            .then((confirmed) => {
                if (confirmed) {
                    console.log("clicked okay", confirmed);
                    this.authService.deleteSingleUser(this.studentDetails._id).subscribe(data => {
                        console.log(data);
                        this.matSnackBar.open(data.message, 'success', {
                            duration: 2000, verticalPosition: 'top', horizontalPosition: "right"
                        });
                    })
                    this.modalService.dismissAll();
                    this.router.navigate(['livequiz/settings/page'])
                }

            })
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
    updateUser() {
        this.studentDetails._student.parent_mobile_number = this.studentMobile
        this.studentDetails._student.parent_email_id = this.parentEmail
        this.authService.updateUser(this.studentDetails._id, this.studentDetails).subscribe(data => {
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