import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import {ConfigComponent} from "./config.component";
import {ConfigEditComponent} from "./config-edit/config-edit.component";
import {UpdatePasswordComponent} from "./update-password/update-password.component";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MessageModule} from "primeng/message";


@NgModule({
  declarations: [ConfigComponent, ConfigEditComponent, UpdatePasswordComponent],
    imports: [
        CommonModule,
        ConfigRoutingModule,
        PasswordModule,
        InputTextModule,
        FormsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MessageModule
    ]
})
export class ConfigModule { }
