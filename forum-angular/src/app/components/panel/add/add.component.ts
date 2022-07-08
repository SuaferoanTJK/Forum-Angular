import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'panel-add',
  templateUrl: '../../layout/userPanelForm.html',
  providers: [UserService, TopicService],
})
export class AddComponent implements OnInit {
  public page_title: string;
  public topic: Topic;
  public identity: any;
  public token: any;
  public btnSubmit: string;
  public status: any;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'Create blog';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity.id, []);
    this.btnSubmit = 'Create';
    this.status = { type: '', msg: '' };
  }

  ngOnInit(): void {}

  onSubmit(form: any) {
    this.topic.date = new Date();
    this._topicService.create(this.token, this.topic).subscribe(
      (response) => {
        if (response.topic) {
          this.status = { type: 'success', msg: 'Blog created' };
          form.reset();
        } else {
          this.status = { type: 'error', msg: 'Blog creation failed' };
        }
      },
      (error) => {
        this.status = { type: 'error', msg: error.error.msg };
      }
    );
  }
}
