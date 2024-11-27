import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {AuthGuard} from "../../../auth/auth.guard";

const routes: Routes = [{
  path: '', component: CustomerListComponent, canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
