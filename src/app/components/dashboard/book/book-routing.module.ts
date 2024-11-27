import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookListComponent} from "./book-list/book-list.component";
import {AuthGuard} from "../../../auth/auth.guard";
import {BookDetailComponent} from "./book-detail/book-detail.component";
import {BookPreviewComponent} from "./book-preview/book-preview.component";

const routes: Routes = [
  {
    path: '', component: BookListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'detail', component: BookDetailComponent, canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id', component: BookDetailComponent, canActivate: [AuthGuard]
  },
  {
    path: 'preview/:id', component: BookPreviewComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
