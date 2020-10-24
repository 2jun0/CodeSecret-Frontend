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

  getSecretKeys(repo_fullname): Observable<SecretKey[]> {
    return this.http.post<SecretKey[]>(`${this.backendUrl}/get-secret-keys`, {repo_fullname:repo_fullname}, {headers: this.authService.getHeader()});
  }

  getLeakedRepos(): Observable<JSON> {
    return this.http.get<JSON>(`${this.backendUrl}/get-leaked-repos`, {headers: this.authService.getHeader()});
  }
}
