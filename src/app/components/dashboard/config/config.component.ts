import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {User} from "../../../auth/interface/user";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent  implements  OnInit{
  user = new User({});

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
     const decode = this.authService.getUser();
     this.user = new User({name: decode.name, userName: decode.sub, role: decode.role, password: ''});
  }

}
