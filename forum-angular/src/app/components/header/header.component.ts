import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  providers: [UserService],
})
export class HeaderComponent implements OnInit {
  public token: any;
  public identity: any;
  public urlUser: any;

  constructor(private _userService: UserService) {
    this.loadUser();
    this.urlUser = global.user;
  }

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
