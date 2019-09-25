import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/fire-service/auth.service';

@Component({
  selector: 'oauth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.FireUser();
  }

  FireUser() {
    this.auth.getUser().subscribe( user => this.user = user);
  }

  loginEmail() {
    const email = '';
    const pass = '';
    this.auth.loginEmail(email, pass);
  }
  loginGoogle() {
    this.auth.loginGoogle();
  }
  loginFacebook() {
    this.auth.loginFacebook();
  }

  FireLogout() {
    this.auth.logout();
  }

}
