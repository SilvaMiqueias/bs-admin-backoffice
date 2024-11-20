import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ConfigEventsService} from "../events/config-events.service";
import {PrimeNGConfig} from "primeng/api";
import {primeNgPtBr} from "../../../../i18n/prime-ng-pt-br";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../login/service/login.service";
import {reportUnhandledError} from "rxjs/internal/util/reportUnhandledError";
import {User} from "../../../../auth/interface/user";
import {AuthService} from "../../../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit{

  user = new User({});


  form = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  })
  private true: any;

  constructor(private route: Router, private toastr: ToastrService,  private primeNGConfig: PrimeNGConfig, private loginService: LoginService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.primeNGConfig.setTranslation(primeNgPtBr);
    this.getUser();
  }


  getUser(){
    const decode = this.authService.getUser();
    this.user = {id: decode.id, userName: decode.sub, name: decode.name}
  }

  update(){
     if(this.form.valid){
       const currentPassword = this.form.get('currentPassword')?.value!;
       const password = this.form.get('password')?.value!;
       const confirmPassword = this.form.get('confirmPassword')?.value!;

       if(this.verifyNewPassword(password, confirmPassword)){
             this.loginService.updatePassword({currentPassword, password, confirmPassword, username: this.user.userName!}).subscribe({
               next: (data) => {
                 this.authService.setToken(data.token);
                 this.getUser();
                 this.route.navigate(['/config']).then(b => this.toastr.success('Atualização de senha completada!'));
               },
               error: (err) => {
                  this.toastr.error('Ocorreu um erro!')
               },
               complete: () =>{

               }
             })

       }else{
         this.toastr.warning('Nova senha e confirmação não são iguais!');
       }

     }
  }

  verifyNewPassword(password: string, confirmPassword: string): boolean{
      if(password !== confirmPassword){
        this.form.get('password')?.setErrors(Validators.pattern('sennhasErradas'));
        this.form.get('confirmPassword')?.setErrors(Validators.pattern('sennhasErradas'));
        return false;
      }
    return true;
  }


}
