import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {HomeComponent} from './home/home.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SharedModule} from "primeng/api";
import {MatTooltipModule} from "@angular/material/tooltip";
import {OrderComponent} from './order/order.component';
import {MenuComponent} from './menu/menu.component';
import {ConfigComponent} from './config/config.component';
import {ChipsModule} from "primeng/chips";
import {InputTextareaModule} from "primeng/inputtextarea";
import { ConfigEditComponent } from './config/config-edit/config-edit.component';
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import { UpdatePasswordComponent } from './config/update-password/update-password.component';
import {ConfigModule} from "./config/config.module";
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
  declarations: [
    HomeComponent,
    OrderComponent,
    MenuComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ConfirmDialogModule,
        SharedModule,
        MatTooltipModule,
        ConfigModule,
        MatSidenavModule
    ]
})
export class DashboardModule { }
