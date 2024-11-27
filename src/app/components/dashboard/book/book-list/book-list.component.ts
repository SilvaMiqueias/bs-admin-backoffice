import {Component, OnInit} from '@angular/core';
import {BookService} from "../service/book-service.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Book} from "../book";
import {ToastrService} from "ngx-toastr";
import {PageEvent} from "@angular/material/paginator";
import {PageBook} from "../page-book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit{

  baseImage = 'data:image/png;base64,';
  books: Book[] | undefined = [];
  private searchTimeout: any;
  search: string = '';
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageBook: PageBook = {};
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent = new PageEvent();
  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;


  constructor(private bookService: BookService, private spinnerService: NgxSpinnerService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.findAllByPage(this.search, 0, 10);
  }

  findAllByPage(_search: string, page: number, size: number){
    this.spinnerService.show();
    this.bookService.findAllByPage(_search, page, size).subscribe({
      next: (data) => {
        this.pageBook = data;
        this.books = this.pageBook.content;
        this.length= this.pageBook.totalElements!;
      } , error: (err) => {}, complete: () => { this.spinnerService.hide()}
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
