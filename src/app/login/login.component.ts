import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// services
import { AuthService } from '../services/auth.service';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLogined: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      id: '',
      password: ''
    })

    this.isLogined = this.authService.isLogined();
  }

  login() {
    console.log('[payload]', this.loginForm.value);

    let payload = this.loginForm.value;
    this.authService.login(payload)
      .subscribe(
        (res) => {
          this.utilService.loadAndRefresh(this.router, '/dashboard');
        },
        ({ error }) => {
          alert('아이디나 비밀번호가 잘못되었습니다.')
        }
      )
  }

  logout() {
    this.authService.logout();
  }
}
