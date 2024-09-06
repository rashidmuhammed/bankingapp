import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.show();

    const authToken = localStorage.getItem('authToken');
    let authReq = request;

    if (authToken) {
      // If token exists, clone the request and add the Authorization header
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else {
      // If token does not exist, redirect to login
      this.router.navigate(['login']);
      return throwError(
        () => new Error('Unauthorized request - No token found')
      );
    }

    // console.log('Request made to:', request.url);

    return next.handle(authReq).pipe(
      tap({
        next: (event) => {
          // console.log('Request successful:', event);
        },
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error.message);

        // Check if the response header indicates an authentication failure
        if (
          error.status === 401 ||
          (error.error && error.error.message === 'Invalid Token')
        ) {
          this.router.navigate(['login']);
        }

        return throwError(() => error);
      }),
      finalize(() => {
        this.loaderService.hide();
        console.log('Request completed');
      })
    );
  }
}
