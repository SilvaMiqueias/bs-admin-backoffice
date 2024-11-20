import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import {InputTextModule} from "primeng/inputtext";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [

    AuthorListComponent,
       AuthorDetailComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    InputTextModule,
    MatTooltipModule,
    MatPaginatorModule,
    InputTextareaModule,
    ReactiveFormsModule
  ]
})
export class AuthorModule { }
