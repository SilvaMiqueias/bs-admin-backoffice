import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./service/login.service";
import {HttpClientModule} from "@angular/common/http";
import {MessageModule} from "primeng/message";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessageModule,
    PasswordModule,
    InputTextModule
  ]
  , providers: [LoginService]
})
export class LoginModule { }
