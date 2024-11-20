import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../service/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Category} from "../category";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent  implements OnInit{

  categoryId: string | undefined;
  category: Category | undefined;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private categoryService: CategoryService, private route: Router, private toastrService: ToastrService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('id')){
        this.categoryId = this.activatedRoute.snapshot.paramMap.get('id')!;
        this.findBy(this.categoryId);
    }
  }


  findBy(id: string){
    this.categoryService.findBy(id).subscribe({
        next: (data) => {
          this.category = data;
          this.form.get('name')?.setValue(this.category?.name!);
          this.form.get('description')?.setValue(this.category?.description!);
        },
        error: (error) => { this.toastrService.error(`Ocorreu um erro!`)}, complete: () => {}
    })
  }

  createOrUpdate(){
    if(this.form.valid){
       const name = this.form.get('name')?.value!;
       const description = this.form.get('description')?.value!;
       if(this.categoryId === undefined){
           this.categoryService.create({name, description}).subscribe({
               next: (data) => {
                   this.category = data;
                   this.toastrService.success(`Categoria ${name} criada com sucesso!`);
               },
               error: (err) => {this.toastrService.error(`Erro ao criar categoria ${name}`);}, complete: () => {}
           })
       }else {
           if(this.category !== undefined)
               this.categoryService.update({id: this.category.id!, name: name, description: description}).subscribe({
                   next: (data) => {
                       this.category = data;
                       this.findBy(this.categoryId!);
                       this.toastrService.success(`Categoria ${name} atualizada com sucesso!`);
                   },
                   error: (err) => {this.toastrService.error(`Erro ao atualizar categoria ${name}`);}, complete: () => {}
               })
           else this.toastrService.error(`Erro ao atualizar categoria ${name}`);
       }
    }else {
      this.toastrService.warning('Preencha os campos corretamente!');
    }
  }

  delete(id: string){
    this.categoryService.delete(id).subscribe({
        next: (data) =>{
            this.toastrService.success(`Categoria excluída com sucesso!`);
            this.route.navigate(['/category'])
        }, error: () =>{ this.toastrService.error(`Erro ao deletar categoria`)},complete: () =>{}
    })
  }


}
