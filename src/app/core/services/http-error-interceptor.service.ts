// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators'; export class HttpErrorInterceptor implements HttpInterceptor {
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request)
//             .pipe(
//                 catchError((error: HttpErrorResponse) => {
//                     let errorMsg = '';
//                     if (error.error instanceof ErrorEvent) {
//                         'this is client side error');
//         errorMsg = `Error: ${error.error.message}`;
//     }
//                     else {
//     'this is server side error');
//     errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
// }
// errorMsg);
// return throwError(errorMsg);
//                 })
//             )
//     }
// }