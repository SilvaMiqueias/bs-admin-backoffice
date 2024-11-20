import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import {InputTextModule} from "primeng/inputtext";
import {MatTooltipModule} from "@angular/material/tooltip";
import {PaginatorModule} from "primeng/paginator";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryDetailComponent
  ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        InputTextModule,
        MatTooltipModule,
        PaginatorModule,
        InputTextareaModule,
        ReactiveFormsModule,
        MatPaginatorModule
    ]
})
export class CategoryModule { }
