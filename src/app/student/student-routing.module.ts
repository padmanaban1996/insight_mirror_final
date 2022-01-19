
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentListComponent } from './student-list/student-list.component';

//shedule routes
const routes: Routes = [

    {
        path: '',
        canActivate: [AuthGuardService],
        children: [
            {
                path: '', redirectTo: 'list',
            },

            {
                path: 'list',
                component: StudentListComponent,
                canActivate: [AuthGuardService]
            },
            // {
            //     path: 'upload',
            //     component: UploadStudentComponent,
            //     canActivate: [AuthGuardService]
            // },

            {
                path: 'create',
                component: StudentCreateComponent,
                canActivate: [AuthGuardService]
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class StudentRoutingModule { }
