import { Component, OnInit } from '@angular/core';
// services
import { AuthService } from '../services/auth.service';
import { SecretKeyService } from '../services/secret-key.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLogined: boolean;
  secretKeys = [];

  constructor(
    private authService: AuthService,
    private secretKeyService: SecretKeyService
  ) { }

  ngOnInit() {
    this.isLogined = this.authService.isLogined();

    if(this.isLogined) {
      this.secretKeyService.getSecretKeys().subscribe(
        (res) => {
          this.secretKeys = res;
        },
        ({error}) => {
          console.log(error);
        }
      );
    }
  }

  logout() {
    this.authService.logout();
  }
}
