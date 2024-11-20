import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from "./components/login/login.module";
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ToastrModule} from "ngx-toastr";
import {ConfirmationService, PrimeNGConfig} from "primeng/api";
import { primeNgPtBr } from './i18n/prime-ng-pt-br';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {MatPaginatorIntlPtBr} from "./components/dashboard/shared/MatPaginatorIntlPtBr";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ],
  providers: [ConfirmationService,
    {
      provide: 'PrimeNGConfig',
      useValue: primeNgPtBr //
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
