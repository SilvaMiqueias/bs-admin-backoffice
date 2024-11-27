import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "../../auth/auth.guard";
import {OrderComponent} from "./order/order.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {ConfigComponent} from "./config/config.component";
import {ConfigEditComponent} from "./config/config-edit/config-edit.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent , canActivate: [AuthGuard],
    children: [
      {
        path: '', component: OrderComponent, canActivate: [AuthGuard]
      },
      {
        path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule)
      },
      {
        path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'author', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule)
      },
      {
        path: 'order', component: NotFoundComponent, canActivate: [AuthGuard]
      },
      {
        path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
