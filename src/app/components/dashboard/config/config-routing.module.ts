import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfigComponent} from "./config.component";
import {AuthGuard} from "../../../auth/auth.guard";
import {ConfigEditComponent} from "./config-edit/config-edit.component";
import {UpdatePasswordComponent} from "./update-password/update-password.component";

const routes: Routes = [
  {
    path: '', component: ConfigComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit', component: ConfigEditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'update-password', component: UpdatePasswordComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
