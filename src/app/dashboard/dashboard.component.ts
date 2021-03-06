import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// services
import { AuthService } from '../services/auth.service';
import { SecretKeyService } from '../services/secret-key.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLogined: boolean;
  leaked_repos = [];
  total_secret_key_cnt = 0;

  constructor(
    private authService: AuthService,
    private secretKeyService: SecretKeyService,
    private utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLogined = this.authService.isLogined();

    if(this.isLogined) {
      this.secretKeyService.getLeakedRepos().subscribe(
        (res) => {
          for(var repo_name in res){
            this.total_secret_key_cnt += res[repo_name]['secret_key_count']
            this.leaked_repos.push(res[repo_name])
          }
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

  logout() {
    this.authService.logout();
  }
}
