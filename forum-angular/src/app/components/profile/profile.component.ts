import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { global } from 'src/app/services/global';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  providers: [UserService, TopicService],
})
export class ProfileComponent implements OnInit {
  public user: any;
  public topics: any;
  public status: any;
  public url: any;
  public id: any;
  public page_title: any;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.status = { type: '', msg: '' };
    this.url = global.user;
  }

  ngOnInit(): void {
    this.getUserID();
    this.getUser();
    this.getUserTopics();
  }

  getUserID() {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getUser() {
    this._userService.getSpecificUser(this.id).subscribe(
      (response) => {
        if (response.user) {
          this.user = response.user;
          console.log(this.user);
          this.page_title = `${this.user.name} ${this.user.surname} - Blogs`;
        } else {
          this._router.navigate(['users']);
        }
      },
      (error) => {
        this._router.navigate(['users']);
      }
    );
  }

  getUserTopics() {
    this._topicService.getUserTopics(this.id).subscribe(
      (response) => {
        if (response.topics) {
          this.topics = response.topics;
          console.log(this.topics);
        } else {
          this.status = { type: 'error', msg: 'No topics find in our DB' };
        }
      },
      (error) => {
        this.status = { type: 'error', msg: error.error.msg };
      }
    );
  }

  getFormat(date: any) {
    return moment(date).fromNow();
  }
}
