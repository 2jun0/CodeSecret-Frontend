import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// envs
import { environment } from 'src/environments/environment';
// models
import { SecretKey } from '../model/secretKey';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecretKeyService {
  backendUrl = environment.backendUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getSecretKeys(): Observable<SecretKey[]> {
    return this.http.get<SecretKey[]>(`${this.backendUrl}/get-secret-keys`, {headers: this.authService.getHeader()});
  }
}
