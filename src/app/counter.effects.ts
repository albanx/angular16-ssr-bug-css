import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';

@Injectable()
export class CounterEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Counter Component] Increment'),
      exhaustMap(() =>
        this.httpClient.get('/test').pipe(
          map((movies) => ({
            type: '[Movies API] Movies Loaded Success',
            payload: movies,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
