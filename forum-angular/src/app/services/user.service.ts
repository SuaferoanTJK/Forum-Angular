import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  public url: string;
  public token: any;
  public identity: any;

  constructor(private _http: HttpClient) {
    this.url = global.user;
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('user') || '{}');
    if (identity && identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}/register`, params, { headers });
  }

  authenticate(data: any): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}/authenticate`, params, { headers });
  }

  login(token: any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(`${this.url}/login`, { headers });
  }

  update(token: any, user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    return this._http.put(`${this.url}/update`, params, { headers });
  }

  uploadImage(token: any, image: any): Observable<any> {
    let params = image;
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post(`${this.url}/upload-avatar`, params, { headers });
  }

  getSpecificUser(id: any): Observable<any> {
    return this._http.get(`${this.url}/specific-user/${id}`);
  }

  getUsers(): Observable<any> {
    return this._http.get(`${this.url}/all-users`);
  }
}
