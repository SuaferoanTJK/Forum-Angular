import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Topic } from '../models/topic';
import { global } from './global';

@Injectable()
export class TopicService {
  public url: string;
  public token: any;
  public identity: any;

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = global.topic;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  create(token: any, topic: Topic): Observable<any> {
    let params = JSON.stringify(topic);
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    return this._http.post(`${this.url}/new-topic`, params, { headers });
  }

  getUserTopics(id: any): Observable<any> {
    return this._http.get(`${this.url}/user-topics/${id}`);
  }

  getTopic(id: any): Observable<any> {
    return this._http.get(`${this.url}/specific-topic/${id}`);
  }

  updateTopic(token: any, id: any, topic: Topic): Observable<any> {
    let params = JSON.stringify(topic);
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    return this._http.put(`${this.url}/${id}`, params, { headers });
  }

  deleteTopic(token: any, id: any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete(`${this.url}/${id}`, { headers });
  }

  getTopics(page = 1): Observable<any> {
    return this._http.get(`${this.url}/topics/${page}`);
  }
}
