import {Component, ElementRef, OnInit} from '@angular/core';
import {Category} from "../../category/category";
import {CategoryService} from "../../category/service/category.service";
import {Author} from "../../author/author";
import {AuthorService} from "../../author/service/author.service";
import {NgxSpinnerService, Spinner} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PrimeNGConfig} from "primeng/api";
import {BookService} from "../service/book-service.service";
import {Book} from "../book";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit{
  sourceCategories: Category[] = [];
  targetCategories: Category[] = [];

  sourceAuthors: Author[] = [];
  targetAuthors: Author[] = [];

  form = new FormGroup({
    price: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    qtd: new FormControl('', Validators.required),
    page: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    releaseDate: new FormControl( new Date(), Validators.required),
  })

  selectedFile: File | null = null;
  imageUrl: string | undefined;
  bookId: string | undefined;
  book: Book = {};

  constructor(private bookService: BookService ,private categoryService: CategoryService, private authorService: AuthorService, private spinner: NgxSpinnerService,
              private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllAuthors();
    if(this.activatedRoute.snapshot.paramMap.get('id')) {
      this.bookId = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.findBy(this.bookId);
    }
  }

  getAllCategory(){
     this.spinner.show();
     this.categoryService.findAll().subscribe({
       next: (data) => {
         this.sourceCategories = data;
       },error: (err) => {this.toastr.error('Ocorreu um erro!')}, complete: () =>{this.spinner.hide()}
     });
  }

  getAllAuthors(){
    this.spinner.show();
    this.authorService.findAll().subscribe({
      next: (data) => {
        this.sourceAuthors = data;
      },error: (err) => {this.toastr.error('Ocorreu um erro!')}, complete: () =>{this.spinner.hide()}
    });
  }

  findBy(id: string){
    this.bookService.findBy(id).subscribe({
      next: (data)=> {
        this.book = data;
        this.mockForm();
      },
      error: (err) => {}, complete: () => {}
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
     if(file.name.split('.').pop().toLowerCase() !== 'png') {
       this.toastr.warning('Apenas é permitido arquivos .png');
       const iptImage = document.getElementById('images') as HTMLInputElement;
       if (iptImage !== null) {iptImage.value = ''};
     }else{
       this.selectedFile = file;
       this.convertToBase64(file);
     }

    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  create(){
    if(this.form.valid && this.imageUrl !== undefined && this.targetCategories.length && this.targetAuthors.length){
        if(this.bookId === undefined){
          this.bookService.create(this.mockBook()).subscribe({
            next: (data) => {
              this.toastr.success('Livro cadastrado!');
              this.router.navigate(['/book']);
            },
            error: (err) => {this.toastr.error('Ocorreu um erro!');}, complete: () => {}
          })
        }else{
          const book = this.mockBook();
          book.id = this.bookId;
          this.bookService.update(book).subscribe({
            next: (data) => {
              this.toastr.success('Livro atualizado!');
              this.router.navigate(['/book']);
            },
            error: (err) => {this.toastr.error('Ocorreu um erro!');}, complete: () => {}
          })
        }
    }else{
      this.toastr.warning('Valide os campos!');
    }

  }

  mockBook(): Book{
    const book = new Book()
    book.price = Number.parseFloat(this.form.get('price')?.value!);
    book.title = this.form.get('title')?.value!;
    book.description = this.form.get('description')?.value!;
    book.qtd = Number.parseFloat(this.form.get('qtd')?.value!);
    book.page = Number.parseFloat(this.form.get('page')?.value!);
    book.language = this.form.get('language')?.value!;
    book.image = this.imageUrl?.split(',')[1];
    book.releaseDate = new Date(this.form.get('releaseDate')?.value!);
    book.authors = this.targetAuthors;
    book.categories = this.targetCategories;
    return book;
  }

  mockForm(){
    this.form.get('price')?.setValue(this.book.price!.toString());
    this.form.get('title')?.setValue(this.book.title!);
    this.form.get('description')?.setValue(this.book.description!.toString());
    this.form.get('qtd')?.setValue(this.book.qtd!.toString());
    this.form.get('page')?.setValue(this.book.page!.toString());
    this.form.get('language')?.setValue(this.book.language!);
    this.imageUrl = 'data:image/png;base64,' + this.book.image;
    this.form.get('releaseDate')?.setValue(new Date(this.book.releaseDate!));
    this.targetAuthors = this.book.authors!;
    this.targetCategories = this.book.categories!;

    this.sourceCategories = this.sourceCategories.filter(item => !this.targetCategories.find(cat => cat.id === item.id))
    this.sourceAuthors = this.sourceAuthors.filter(item => !this.targetAuthors.find(aut => aut.id === item.id));

  }

}
