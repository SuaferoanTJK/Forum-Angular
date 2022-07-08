import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { global } from './global';

@Injectable()
export class CommentService {
  public url: string;
  public token: any;
  public identity: any;

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = global.comment;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  add(token: any, comment: any, topicID: any): Observable<any> {
    let params = JSON.stringify(comment);
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    return this._http.post(`${this.url}/topic/${topicID}`, params, { headers });
  }

  delete(token: any, topicID: any, commentID: any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete(`${this.url}/topic/${topicID}&${commentID}`, {
      headers,
    });
  }
}
