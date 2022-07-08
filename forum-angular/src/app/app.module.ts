import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { HighlightJsModule } from 'ngx-highlight-js';

/* Principal Module */
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';

/* Panel Module */
import { ListComponent } from './components/panel/list/list.component';
import { AddComponent } from './components/panel/add/add.component';
import { EditComponent } from './components/panel/edit/edit.component';

/* Guard */
import { UserService } from './services/user.service';
import { UserNoAuthGuard } from './services/userNoAuth.guard';
import { UserAuthGuard } from './services/userAuth.guard';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    ErrorComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    TopicsComponent,
    TopicDetailComponent,
    UsersComponent,
    ProfileComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HighlightJsModule,
  ],
  providers: [UserService, UserNoAuthGuard, UserAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
