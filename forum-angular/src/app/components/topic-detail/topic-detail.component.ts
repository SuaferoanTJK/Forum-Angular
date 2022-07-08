import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment';
import { global } from 'src/app/services/global';

@Component({
  selector: 'topic-detail',
  templateUrl: './topic-detail.component.html',
  providers: [UserService, TopicService, CommentService],
})
export class TopicDetailComponent implements OnInit {
  public topic: any;
  public comment: Comment;
  public token: any;
  public identity: any;
  public status: any;
  public comments: any;
  public urlUser: any;
  public commentID: any;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _commentService: CommentService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.comment = new Comment('', '', '', this.identity.id);
    this.status = { type: '', msg: '' };
    this.urlUser = global.user;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._topicService.getTopic(id).subscribe(
        (response) => {
          if (response.topic) {
            this.topic = response.topic;
            this.comments = response.topic.comments;
          } else {
            this._router.navigate(['/']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  ngDoCheck(): void {
    this.topic;
  }

  getFormat(date: any) {
    return moment(date).fromNow();
  }

  commentSelected(id: any) {
    this.commentID = id;
  }

  deleteComment(id: any) {
    this._commentService
      .delete(this.token, this.topic._id, this.commentID)
      .subscribe(
        (response) => {
          if (response.topic) {
            this.status = {
              type: 'success',
              msg: 'Comment deleted from this blog',
            };
            this.topic = response.topic;
          } else {
            this.status = {
              type: 'error',
              msg: 'Comment could not be deleted from this blog',
            };
          }
          setTimeout(() => {
            this.status = { type: '', msg: '' };
          }, 3000);
        },
        (error) => {
          this.status = { type: 'error', msg: error.error.msg };
          setTimeout(() => {
            this.status = { type: '', msg: '' };
          }, 3000);
        }
      );
  }

  onSubmit(form: any) {
    this._commentService
      .add(this.token, this.comment, this.topic._id)
      .subscribe(
        (response) => {
          if (!response.topic) {
            this.status = { type: 'error', msg: 'An error ocurred' };
          } else {
            this.status = { type: 'success', msg: 'Comment added to blog' };
            this.topic = response.topic;
          }
          setTimeout(() => {
            this.status = { type: '', msg: '' };
          }, 3000);
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
