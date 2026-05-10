import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {

  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: string;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(
      `${environment.backendHost}/auth/login`,
      params, options
    );
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    let jwtData: any = jwtDecode(this.accessToken);
    this.username = jwtData.sub;
    this.roles = jwtData.scope;
    window.localStorage.setItem('jwt-token', this.accessToken);
  }

  loadTokenFromLocalStorage() {
    let token = window.localStorage.getItem('jwt-token');
    if (token) {
      this.loadProfile({'access-token': token});
      this.router.navigateByUrl('/admin/customers');
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = '';
    this.username = undefined;
    this.roles = undefined;
    window.localStorage.removeItem('jwt-token');
    this.router.navigateByUrl('/login');
  }
}
