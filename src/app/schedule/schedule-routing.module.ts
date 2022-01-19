import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { AttendenceSummaryComponent } from '../attendence-summary/attendence-summary.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { FormComponent } from './form/form.component';
import { ScheduleUiComponent } from './schedule-ui/schedule-ui.component';

//shedule routes
const routes: Routes = [

    {
        path: '',

        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'list',
            },
            {
                path: 'list',
                component: ScheduleUiComponent,
                canActivate: [AuthGuardService],
            },
            {
                path: 'create',
                component: FormComponent,
                canActivate: [AuthGuardService],

            },

            {
                path: 'attendence',
                component: AttendenceSummaryComponent,
                canActivate: [AuthGuardService],
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class ScheduleRoutingModule { }
