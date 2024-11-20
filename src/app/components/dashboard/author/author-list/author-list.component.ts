import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {PageEvent} from "@angular/material/paginator";
import {PageAuthor} from "../page-author";
import {AuthorService} from "../service/author.service";
import {Author} from "../author";

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit{
  private searchTimeout: any;
  search: string = '';
  authors: Author[] | undefined = [];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;


  pageAuthor: PageAuthor = {};
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent = new PageEvent();
  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(private authorService: AuthorService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.findAllByPage(this.search, this.pageIndex, this.pageSize)
  }

  findAllByPage(_search: string, page: number, size: number){
    this.spinner.show();
    this.authorService.findAllByPage(this.search, page, size).subscribe({
      next: (data) => {
        this.pageAuthor = data;
        this.authors = this.pageAuthor.content;
        this.length= this.pageAuthor.totalElements!;
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
