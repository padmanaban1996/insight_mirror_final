
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { teacherCreateComponent } from './teacher-create/teacher-create.component';
import { teacherListComponent } from './teacher-list/teacher-list.component';
import { UploadTeacherComponent } from './upload-teacher/upload-teacher.component';

//shedule routes
const routes: Routes = [

    {
        path: '',
        canActivate: [AuthGuardService],
        children: [
            {
                path: "", redirectTo: 'list', pathMatch: 'full'
            },
            {
                path: 'list',
                component: teacherListComponent,
                canActivate: [AuthGuardService]
            },
            // {
            //     path: 'upload',
            //     component: UploadTeacherComponent,
            //     canActivate: [AuthGuardService]
            // },

            {
                path: 'create',
                component: teacherCreateComponent,
                canActivate: [AuthGuardService]
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class teacherRoutingModule { }
