import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'user-edit',
  templateUrl: '../layout/form.html',
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
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

  constructor(private _userService: UserService, private _router: Router) {
    this.page_title = 'User Settings';
    this.paragraph = 'Update the info from your profile that you desire';
    this.status = { type: '', msg: '' };
    this.formType = 'settings';
    this.btnSubmit = 'Update';
    this.imgSectionURL = 'assets/images/settings.png';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(
      this.identity.name,
      this.identity.surname,
      this.identity.email,
      this.identity.password,
      this.identity.image,
      this.identity.role
    );
    this.url = global.user;
  }

  ngOnInit(): void {}

  uploadFile(event: any) {
    this.file = event.target.files[0];
  }

  uploadData() {
    this._userService.update(this.token, this.user).subscribe(
      (response) => {
        if (response.userDataUpdated) {
          const userUpdated = {
            ...this.user,
            exp: this.identity.exp,
            iat: this.identity.iat,
            id: this.identity.id,
          };
          console.log(userUpdated);
          localStorage.setItem('user', JSON.stringify(userUpdated));
          this._router.navigate(['home']);
        } else {
          this.status = { type: 'error', msg: 'User update has failed' };
        }
      },
      (error) => {
        this.status = { type: 'error', msg: error.error.msg };
      }
    );
  }

  onSubmit(form: any) {
    // Upload avatar image
    let formData = new FormData();
    formData.set('file', this.file);
    if (this.file && this.file != 'undefined') {
      this._userService.uploadImage(this.token, formData).subscribe(
        (response) => {
          if (response.userDataUpdated.image) {
            this.user.image = response.userDataUpdated.image;
            this.uploadData();
          } else {
            this.user.image = this.identity.image;
          }
        },
        (error) => {
          this.user.image = this.identity.image;
          this.status = { type: 'error', msg: 'Image could not be uploaded' };
        }
      );
    } else {
      this.user.image = this.identity.image;
      this.uploadData();
    }
  }
}
