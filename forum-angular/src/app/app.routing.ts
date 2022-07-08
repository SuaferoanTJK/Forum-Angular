import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Principal Module */
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ErrorComponent } from './components/error/error.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

/* Panel Module */
import { ListComponent } from './components/panel/list/list.component';
import { AddComponent } from './components/panel/add/add.component';
import { EditComponent } from './components/panel/edit/edit.component';

/* Guards */
import { UserNoAuthGuard } from './services/userNoAuth.guard';
import { UserAuthGuard } from './services/userAuth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [UserAuthGuard] },
  { path: 'logout/:sure', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'settings',
    component: UserEditComponent,
    canActivate: [UserNoAuthGuard],
  },
  { path: 'topics', component: TopicsComponent },
  { path: 'topics/:page', component: TopicsComponent },
  { path: 'topic/:id', component: TopicDetailComponent },
  { path: 'panel', component: ListComponent, canActivate: [UserNoAuthGuard] },
  {
    path: 'panel/list',
    component: ListComponent,
    canActivate: [UserNoAuthGuard],
  },
  {
    path: 'panel/add',
    component: AddComponent,
    canActivate: [UserNoAuthGuard],
  },
  {
    path: 'panel/edit/:id',
    component: EditComponent,
    canActivate: [UserNoAuthGuard],
  },
  { path: 'users', component: UsersComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'search/:search', component: SearchComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
