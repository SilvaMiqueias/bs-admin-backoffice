import {Component, OnInit} from '@angular/core';
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private authService: AuthService, private confirmationService: ConfirmationService, private route: Router, private toast: ToastrService) {
  }
  ngOnInit(): void {
  }

  logout(){
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja encerrar a seção?',

      accept: () => {
        this.authService.logout();
        this.route.navigate(['/login']).then(b => this.toast.warning('Sua seção foi encerrada!'));
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      }
    });
  }

}
