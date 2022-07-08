import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'register',
  templateUrl: '../layout/form.html',
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public paragraph: string;
  public user: User;
  public status: any;
  public formType: string;
  public btnSubmit: string;
  public imgSectionURL: string;
  public token: any;
  public identity: any;
  public file: any;
  public url: any;

  constructor(private _userService: UserService) {
    this.page_title = 'Register';
    this.paragraph = 'Register in our platform to create new posts and more';
    this.user = new User('', '', '', '', '', 'ROLE_USER');
    this.status = { type: '', msg: '' };
    this.formType = 'register';
    this.btnSubmit = 'Register';
    this.imgSectionURL = 'assets/images/register.png';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.user;
  }

  ngOnInit(): void {}

  onSubmit(form: any) {
    this._userService.register(this.user).subscribe(
      (response) => {
        if (response.userStored) {
          this.status = { type: 'success', msg: 'Register successful' };
          form.reset();
        } else {
          this.status = { type: 'error', msg: 'Register has failed' };
        }
      },
      (error) => {
        this.status = { type: 'error', msg: error.error.msg };
      }
    );
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
  }
}
