// import { DebugElement } from '@angular/core';
// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// import { BrowserModule } from '@angular/platform-browser';
// import { By, by } from 'protractor';
// import { LoginComponent } from './login.component';


// describe('Component: LoginComponent', () => {

//     let component: LoginComponent;
//     let fixture: ComponentFixture<LoginComponent>;
//     let de: DebugElement = new DebugElement();

//     beforeEach(() => {

//         // refine the test module by declaring the test component
//         TestBed.configureTestingModule({
//             imports: [ReactiveFormsModule, FormsModule, BrowserModule],
//             declarations: [LoginComponent],
//             providers: []
//         }).compileComponents().then(() => {
//             fixture = TestBed.createComponent(LoginComponent);


//             component = fixture.componentInstance;
//             component.ngOnInit();
//         })



//     });
//     it('email validation', () => {
//         let errors = {};

//         let email = component.authLoginForm.controls['email']
//         errors = email.errors || {}
//         console.log('errors of ', errors);
//         expect(email.valid).toBeFalsy();

//         // email.setValue("test");
//         // errors = email.errors || {};
//         // expect(errors['required']).toBeFalsy();
//         // expect(errors['pattern']).toBeTruthy();


//         // email.setValue("test@example.com");
//         // errors = email.errors || {};
//         // expect(errors['required']).toBeFalsy();
//         // expect(errors['pattern']).toBeFalsy();
//     });



// });