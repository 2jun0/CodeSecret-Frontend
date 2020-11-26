import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// services
import { AuthService } from '../services/auth.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  joinForm: FormGroup;
  isLogined: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
    this.joinForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required, Validators.pattern(/^[0-9a-z]{5,12}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/)]),
      repeatPassword: '',
      githubUsername: '',
      githubPassword: ''
    })

    this.isLogined = this.authService.isLogined();
  }

  join() {
    console.log('[payload]', this.joinForm.value);

    let payload = this.joinForm.value;
    
    if(payload.githubUsername.includes('@')) {
      alert('깃허브 정보는 이메일이 아닌 사용자이름을 입력해주세요.')
      return
    }

    if(payload.password != payload.repeatPassword) {
      alert('비밀번호를 다시 입력해주세요.')
      this.utilService.loadAndRefresh(this.router, '/join');
      return
    }

    this.authService.join(payload)
      .subscribe(
        (res) => {
          this.utilService.loadAndRefresh(this.router, '/login');
        },
        ({ error }) => {
          console.error(error);
          alert(error['msg']);
        }
      )
  }

  logout() {
    this.authService.logout();
  }
}
