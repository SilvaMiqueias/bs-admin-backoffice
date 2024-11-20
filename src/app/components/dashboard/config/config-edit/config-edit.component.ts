import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ConfigEventsService} from "../events/config-events.service";
import {PrimeNGConfig} from "primeng/api";
import {primeNgPtBr} from "../../../../i18n/prime-ng-pt-br";
import {UpdatePasswordComponent} from "../update-password/update-password.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../login/service/login.service";
import {AuthService} from "../../../../auth/auth.service";
import {User} from "../../../../auth/interface/user";
import {MatNavList} from "@angular/material/list";

@Component({
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.scss']
})
export class ConfigEditComponent implements OnInit{

  user = new User({});


   form =  new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email ,Validators.pattern(/.*@.*/)]),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private toastr: ToastrService, private authService: AuthService
               , private primeNGConfig: PrimeNGConfig, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.primeNGConfig.setTranslation(primeNgPtBr);
    this.getUser();
  }

  getUser(){
    const decode = this.authService.getUser();
    this.user = {id: decode.id, userName: decode.sub, name: decode.name}
    this.form.get('email')?.setValue(decode.sub);
    this.form.get('name')?.setValue(decode.name);
  }

  update(){
     if(this.form.valid){
       const name =  this.form.get('name')?.value!;
       const email = this.form.get('email')?.value!;
       const password = this.form.get('password')?.value!;

      if(this.verifyFields(name, email)){
        if(this.form.valid && name !== null && email !== null && password !== null)
          this.loginService.updateUser({username: email,  name, id: this.user.id!, password}).subscribe({
            next: (data) => {
               if(data){
                 this.authService.setToken(data.token);
                 this.getUser();
                 this.form.get('password')?.setValue('');
                 this.toastr.success('Alteração bem secedida!');
               }
            },
            error: (err) => {
              this.toastr.error('Ocorreu um erro!')
            },
            complete: () => {}
          })
      } else this.toastr.warning('Não há alteração nos dados!');
     }
  }

  verifyFields(name: string, email: string): boolean{
    const decode = this.authService.getUser();
    if(name === decode.name && email === decode.sub) return false;
    else return true;
  }


  protected readonly frames = frames;
}
