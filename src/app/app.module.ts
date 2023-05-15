import { APP_ID, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { counterReducer } from './counter.reducers';
import { CounterEffects } from './counter.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ParaComponent } from './para/para.component';
import { RequestInterceptor } from './request.interceptor';

@NgModule({
  declarations: [AppComponent, ParaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ count: counterReducer }),
    EffectsModule.forRoot([CounterEffects]),
  ],
  providers: [
    provideClientHydration(),
    { provide: APP_ID, useValue: 'homezone' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
