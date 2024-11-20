import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../service/category.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Category} from "../category";
import {PageCategory} from "../page-category";
import {PageEvent} from "@angular/material/paginator";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent  implements  OnInit{
  private searchTimeout: any;
  search: string = '';
  categories: Category[] | undefined;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;


  pageCategory: PageCategory = {};
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent = new PageEvent();
  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;


  constructor(private categoryService: CategoryService, private route: Router, private toastrService: ToastrService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.findAllByPage(this.search,0, 10);
  }

  findAllByPage(_search: string, page: number, size: number){
    this.spinner.show();
    this.categoryService.findAllByPage(this.search, page, size).subscribe({
      next: (data) => {
        this.pageCategory = data;
        this.categories = this.pageCategory.content;
        this.length= this.pageCategory.totalElements!;
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
    }, 2000);
  }

}
