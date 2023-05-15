import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select, createSelector } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';
import { decrement, increment, reset } from './counter.actions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ciam_spa_angular16';
  subscription: Subscription = new Subscription;
  count$: Observable<number>;
  req$: Observable<any>;
  justNumbers$: Observable<number[]>;
  constructor(private store: Store<{ count: number }>, private http: HttpClient) {
    this.count$ = store.select('count');
    this.justNumbers$ = of([1,2,3,4,5,6,7,8,9,10]);
    this.req$ = this.http.get('https://cat-fact.herokuapp.com/facts');
  }

  ngOnInit(): void {
    this.subscription.add(() => 1)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  increment() {
    this.store.dispatch(increment());
  }
 
  decrement() {
    this.store.dispatch(decrement());
  }
 
  reset() {
    this.store.dispatch(reset());
  }
}
