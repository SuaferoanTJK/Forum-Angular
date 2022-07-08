import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  providers: [UserService],
})
export class AppComponent {
  title = 'Angular Forum';

  ngOnInit(): void {
    console.log('App loaded');
  }
}
