import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthorService} from "../service/author.service";
import {Author} from "../author";

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent  implements  OnInit{

  authorId: string | undefined;
  author: Author | undefined;

  constructor(private authorService: AuthorService ,private route: Router, private toastrService: ToastrService, private activatedRoute: ActivatedRoute) {
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('id')){
      this.authorId = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.findBy(this.authorId);
    }
  }

  findBy(id: string){
    this.authorService.findBy(id).subscribe({
      next: (data) => {
        this.author = data;
        this.form.get('name')?.setValue(this.author?.name!);
        this.form.get('description')?.setValue(this.author?.description!);
      },
      error: (error) => { this.toastrService.error(`Ocorreu um erro!`)}, complete: () => {}
    })
  }

  createOrUpdate(){
    if(this.form.valid){
      const name = this.form.get('name')?.value!;
      const description = this.form.get('description')?.value!;
      if(this.authorId === undefined){
        this.authorService.create({name, description}).subscribe({
          next: (data) => {
            this.author = data;
            this.toastrService.success(`Autor(a) ${name} criada com sucesso!`);
          },
          error: (err) => {this.toastrService.error(`Erro ao criar autor(a) ${name}`);}, complete: () => {}
        })
      }else {
        if(this.author !== undefined)
          this.authorService.update({id: this.author.id!, name: name, description: description}).subscribe({
            next: (data) => {
              this.author = data;
              this.findBy(this.authorId!);
              this.toastrService.success(`Autor(a) ${name} atualizada com sucesso!`);
            },
            error: (err) => {this.toastrService.error(`Erro ao atualizar autor(a) ${name}`);}, complete: () => {}
          })
        else this.toastrService.error(`Erro ao atualizar autor(a) ${name}`);
      }
    }else {
      this.toastrService.warning('Preencha os campos corretamente!');
    }
  }

  delete(authorId: string){
    this.authorService.delete(authorId).subscribe({
      next: (data) =>{
        this.toastrService.success(`Autor(a) excluído(a) com sucesso!`);
        this.route.navigate(['/category'])
      }, error: () =>{ this.toastrService.error(`Erro ao deletar autor(a)`)},complete: () =>{}
    })
  }

}
