import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../service/customer.service";
import {PageBook} from "../../book/page-book";
import {PageEvent} from "@angular/material/paginator";
import {NgxSpinnerService} from "ngx-spinner";
import {PageCustomer} from "../page.customer";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit{
  private searchTimeout: any;
  search: string = '';
  customers: any[] | undefined = [];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageCustomer: PageCustomer = {};
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent = new PageEvent();
  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  constructor(private customerService: CustomerService, private spinner: NgxSpinnerService) {
  }
  ngOnInit(): void {
    this.findAllByPage(this.search, 0, 10);
  }


  findAllByPage(_search: string, page: number, size: number){
    this.spinner.show();
    this.customerService.findAllByPage(_search, page, size).subscribe({
      next: (data) => {
        this.pageCustomer = data;
        this.customers = this.pageCustomer.content;
        this.length= this.pageCustomer.totalElements!;
      } , error: (err) => {}, complete: () => { this.spinner.hide()}
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.findAllByPage(this.search, this.pageIndex, this.pageSize);
  }

  filter(value: string){
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout =  setTimeout(() =>{
      this.search = value;
      this.findAllByPage(value, 0, this.pageSize);
    }, 1000);
  }


}
