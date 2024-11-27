import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {BookRoutingModule} from './book-routing.module';
import {BookListComponent} from './book-list/book-list.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BookPreviewComponent} from './book-preview/book-preview.component';
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FileUploadModule} from "primeng/fileupload";
import {PickListModule} from "primeng/picklist";
import {CalendarModule} from "primeng/calendar";
import {PrimeNGConfig} from "primeng/api";
import { primeNgPtBr } from '../../../i18n/prime-ng-pt-br';
import {MatPaginatorModule} from "@angular/material/paginator";
import {TagModule} from "primeng/tag";



@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookPreviewComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    InputTextModule,
    CardModule,
    FormsModule,
    MatTooltipModule,
    FileUploadModule,
    PickListModule,
    NgOptimizedImage,
    CalendarModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    TagModule
  ]
})
export class BookModule {
  constructor(private config: PrimeNGConfig) {
    this.config.setTranslation(primeNgPtBr);
  }
}
