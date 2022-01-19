import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtService } from './services/jwt.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AuthService } from './services/auth.service';
import { CheckFormFieldValidity } from './validators/check-formfieldvalidity.directive';
import { ExcelService } from './services/excel.service';
import { ChartsModule } from 'ng2-charts';
import { SafePipe } from '../quiz/students-quiz-result/safe.pipe';


@NgModule({
  declarations: [CheckFormFieldValidity, SafePipe],
  imports: [
    CommonModule,
    HttpClientModule,
    ChartsModule
  ],
  exports: [
    CheckFormFieldValidity,
    SafePipe
  ],
  providers: [AuthGuardService, JwtService, HttpInterceptorService, AuthService, ExcelService]
})
export class CoreModule { }
