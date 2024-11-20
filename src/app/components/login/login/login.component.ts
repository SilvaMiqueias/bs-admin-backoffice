import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

   form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/.*@.*/), Validators.email]),
    password: new FormControl('', Validators.required)
  })


  constructor(private toastr: ToastrService, private loginService: LoginService, private router: Router, private authService: AuthService) {

  }
  ngOnInit(): void {

  }

  submit(){
     if(this.form.valid){
          const email = this.form.get('email')?.value;
          const password = this.form.get('password')?.value;
          if(email != null && password != null)
           this.loginService.login({ username: email, password})
           .subscribe( {
             next: (data) => {
                if(data){
                  this.authService.setToken(data.token);
                  this.router.navigate(['']).then(r => this.toastr.success('Logado com sucesso!'));
                }else{
                  this.toastr.warning('Usuário sem permissão necessária!')
                }

             },
             error: (error) =>{
               this.toastr.error('Verifique os dados!')
             },
             complete: () =>{
                //completado!
             }
           })
     }else{
       this.toastr.error('Ocorreu um erro!')
     }

  }

}
