import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
      id: new FormControl('', [Validators.required, Validators.pattern(/^[0-9a-z]{5,12}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/)])
    })

    this.isLogined = this.authService.isLogined();
    if(this.isLogined) {
      this.utilService.loadAndRefresh(this.router, '/dashboard');
    }
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
