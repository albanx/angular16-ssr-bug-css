import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Store, createSelector } from '@ngrx/store';
import { switchMap, first } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private store: Store<{ count: number }>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('count').pipe(
      first(),
      switchMap((count, index) => {
        const cloneRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${count}`,
            Accept: 'application/json;charset=UTF-8',
          },
        });
        return next.handle(cloneRequest);
      })
    );
  }
}
