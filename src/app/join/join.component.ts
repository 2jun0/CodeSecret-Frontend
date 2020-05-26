import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      id: '',
      password: '',
      githubUsername: '',
      githubPassword: ''
    })

    this.isLogined = this.authService.isLogined();
  }

  join() {
    console.log('[payload]', this.joinForm.value);

    let payload = this.joinForm.value;
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
