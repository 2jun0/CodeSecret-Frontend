import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 
// envs
import { environment } from 'src/environments/environment';
// models
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = environment.backendUrl;

  constructor(
    private http: HttpClient
  ) { }

  login(credential: User): Observable<JSON> {
    return this.http.post<JSON>(`${this.backendUrl}/login`, credential)
      .pipe(
        tap(res => {
          if(res['token']) {
            this.setToken(res['token']);
          }
        })
      )
  }

  join(user: User): Observable<JSON> {
    return this.http.post<JSON>(`${this.backendUrl}/join`, user);
  }

  logout(): void {
    this.removeToken();
  }

  isLogined(): boolean {
    if(this.getToken()) {
      return true;
    }else{
      return false;
    }
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`)
  }
}