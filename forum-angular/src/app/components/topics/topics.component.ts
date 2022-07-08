import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'topics',
  templateUrl: './topics.component.html',
  providers: [TopicService],
})
export class TopicsComponent implements OnInit {
  public page_title: string;
  public topics: any;
  public totalPages: any;
  public page: any;
  public next_page: any;
  public prev_page: any;
  public number_pages: any;

  constructor(
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Blogs';
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let page = +params['page'];
      if (!page) {
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }
      this.getTopics(page);
    });
  }

  getFormat(date: any) {
    return moment(date).fromNow();
  }

  getTopics(page = 1) {
    this._topicService.getTopics(page).subscribe(
      (response) => {
        if (response.topics) {
          this.topics = response.topics;
          this.totalPages = response.totalPages;
          let number_pages = [];
          for (let i = 1; i <= this.totalPages; i++) {
            number_pages.push(i);
          }
          this.number_pages = number_pages;
          if (page >= 2) {
            this.prev_page = page - 1;
          } else {
            this.prev_page = 1;
          }
          if (page < this.totalPages) {
            this.next_page = page + 1;
          } else {
            this.next_page = this.totalPages;
          }
        } else {
          this._router.navigate(['/home']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
