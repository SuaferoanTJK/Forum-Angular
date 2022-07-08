import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'login',
  templateUrl: '../layout/form.html',
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public paragraph: string;
  public user: any;
  public status: any;
  public formType: string;
  public btnSubmit: string;
  public imgSectionURL: string;
  public token: any;
  public identity: any;
  public file: any;
  public url: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Log in';
    this.paragraph =
      'Create and manage your blogs as soon as you are logged in';
    this.user = {};
    this.status = { type: '', msg: '' };
    this.formType = 'login';
    this.btnSubmit = 'Log in';
    this.imgSectionURL = 'assets/images/register.png';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.user;
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form: any) {
    // Authenticate data
    this._userService.authenticate(this.user).subscribe(
      (response) => {
        if (response.token) {
          this.status = { type: 'success', msg: 'Login successful' };
          localStorage.setItem('token', response.token);

          // Use token generated to log in
          this._userService.login(response.token).subscribe(
            (response) => {
              if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
                this._router.navigate(['home']);
              } else {
                this.status = { type: 'error', msg: 'Login has failed' };
              }
            },
            (error) => {
              this.status = { type: 'error', msg: error.error.msg };
            }
          );
        } else {
          this.status = { type: 'error', msg: 'Authentication has failed' };
        }
      },
      (error) => {
        this.status = { type: 'error', msg: error.error.msg };
      }
    );
  }

  logout() {
    this._route.params.subscribe((params) => {
      let logout = +params['sure'];
      if (logout == 1) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this._router.navigate(['home']);
      }
    });
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
  }
}
