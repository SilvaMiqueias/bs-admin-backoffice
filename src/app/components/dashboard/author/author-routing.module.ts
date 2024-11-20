import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorListComponent} from "./author-list/author-list.component";
import {AuthGuard} from "../../../auth/auth.guard";
import {AuthorDetailComponent} from "./author-detail/author-detail.component";

const routes: Routes = [
  {
    path: '', component: AuthorListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'detail', component: AuthorDetailComponent, canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id', component: AuthorDetailComponent, canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
