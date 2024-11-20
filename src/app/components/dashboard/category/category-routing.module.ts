import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryListComponent} from "./category-list/category-list.component";
import {AuthGuard} from "../../../auth/auth.guard";
import {CategoryDetailComponent} from "./category-detail/category-detail.component";

const routes: Routes = [
  {
    path: '', component: CategoryListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'detail', component: CategoryDetailComponent, canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id', component: CategoryDetailComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
