import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { SecretKeyService } from '../services/secret-key.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private repo_fullname: string
  private isLogined: Boolean
  private secret_keys
  private userId: String
  private pull_request_url: String

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private secretKeyService: SecretKeyService,
    private utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.repo_fullname = params['repo_fullname'];
      this.userId = params['userId'];
      this.pull_request_url = params['pull_request_url'];
    });

    this.isLogined = this.authService.isLogined();

    if(this.isLogined) {
      this.secretKeyService.getSecretKeys(this.repo_fullname).subscribe(
        (res) => {
          this.secret_keys = res
        },
        (err) => {
          if (err.status == 401) {
            this.authService.logout()
            this.utilService.loadAndRefresh(this.router, '/login');
          } else{
            console.error(err);
          }
        }
      );
    }
  }

}
