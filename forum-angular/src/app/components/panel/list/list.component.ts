import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  providers: [UserService, TopicService],
})
export class ListComponent implements OnInit {
  public page_title: string;
  public topics: any;
  public identity: any;
  public token: any;
  public status: any;
  public topicID: any;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'My blogs';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.status = { type: '', msg: '' };
  }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics() {
    this._topicService.getUserTopics(this.identity.id).subscribe(
      (response) => {
        if (response.topics) {
          this.topics = response.topics;
        } else {
          this.status = { type: 'error', msg: 'No topics where found' };
        }
      },
      (error) => {
        this.status = { type: 'error', msg: error.error.msg };
      }
    );
  }

  getFormat(date: any) {
    return moment(date).format('LLLL');
  }

  topicSelected(id: any) {
    this.topicID = id;
  }

  deleteTopic(id: any) {
    this._topicService.deleteTopic(this.token, id).subscribe(
      (response) => {
        this.topicID = '';
        this.getTopics();
      },
      (error) => {
        this.status = { type: 'error', msg: error.error.msg };
        setTimeout(() => {
          this.status = { type: '', msg: '' };
        }, 3000);
      }
    );
  }
}
