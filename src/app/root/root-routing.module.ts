import { InjectionToken, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../core/services/http-interceptor.service';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
import { WhiteboardComponent } from '../whiteboard/whiteboard.component';
import { AppComponent } from '../app/app.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { LiveclassComponent } from '../liveclass-template/liveclass.component';
import { SuperAdminComponent } from '../super-admin/super-admin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { QuiztestComponent } from '../quiz/quiztest/quiztest.component';

const routes: Routes = [

    {
        path: "",
        redirectTo: "livequiz",
        pathMatch: 'full'
    },
    {
        path: 'superAdmin',
        loadChildren: () => import('../super-admin/super-admin-routing.module').then(m => m.SuperAdminRoutingModule)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'whiteboard',
        component: WhiteboardComponent
    },
    {
        path: "reset-password/:token",
        component: ResetPasswordComponent
    },
    {
        path: 'liveclass',
        component: LiveclassComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: 'test',
        component: QuiztestComponent,
        canActivate: [AuthGuardService]
    },

    //reroute to connect live class
    {
        path: 'externalRedirect',
        canActivate: [externalUrlProvider],
        // We need a component here because we cannot define the route otherwise
        component: PageNotFoundComponent,
    },


    {
        path: 'livequiz',
        canActivate: [AuthGuardService],
        loadChildren: () => import('../app/app-routing.module').then((m) => m.AppRoutingModule)
    },

    //default route
    {
        path: '**',
        component: PageNotFoundComponent
    }



];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: [
        {
            provide: externalUrlProvider,
            useValue: (route: ActivatedRouteSnapshot) => {

                const externalUrl = route.paramMap.get('externalUrl');
                window.open(externalUrl, '_self');
            },
        },
        {
            provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
        }
    ]
})
export class RootRoutingModule { }
