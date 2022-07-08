import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'panel-edit',
  templateUrl: '../../layout/userPanelForm.html',
  providers: [UserService, TopicService],
})
export class EditComponent implements OnInit {
  public page_title: string;
  public topic: any;
  public identity: any;
  public token: any;
  public btnSubmit: string;
  public status: any;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = 'Edit blog';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity.id, null);
    this.btnSubmit = 'Update';
    this.status = { type: '', msg: '' };
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._topicService.getTopic(id).subscribe(
        (response) => {
          this.topic = response.topic;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  onSubmit(form: any) {
    console.log(this.topic);
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._topicService.updateTopic(this.token, id, this.topic).subscribe(
        (response) => {
          this._router.navigate(['/panel']);
        },
        (error) => {
          this.status = { type: 'error', msg: error.error.msg };
        }
      );
    });
  }
}
