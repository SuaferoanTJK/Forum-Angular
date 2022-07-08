import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [UserService],
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public token: any;
  public identity: any;

  constructor(private _userService: UserService) {
    this.page_title = 'Welcome to this developer forum';
    this.loadUser();
  }

  ngOnInit(): void {}

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
