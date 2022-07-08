import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  public users: any;
  public status: any;
  public url: any;

  constructor(private _userService: UserService) {
    this.status = { type: '', msg: '' };
    this.url = global.user;
  }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(
      (response) => {
        if (response.users) {
          this.users = response.users;
        } else {
          this.status = { type: 'error', msg: 'No users find in our DB' };
        }
      },
      (error) => {
        this.status = { type: 'error', msg: error.error.msg };
      }
    );
  }
}
