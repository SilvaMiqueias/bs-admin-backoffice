import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {InputTextModule} from "primeng/inputtext";
import {AvatarModule} from "primeng/avatar";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatPaginatorModule,
    InputTextModule,
    AvatarModule,
    MatTooltipModule
  ]
})
export class CustomerModule { }
