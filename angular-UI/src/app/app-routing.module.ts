import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AuthGuard } from './user/auth/auth.guard';


const routes: Routes = [
  {path: 'sign-up' , component : UserComponent,children: [
    { path : '' , component: SignUpComponent} ,
    
  ] } ,
  {path: 'log-in' , component : UserComponent,children: [
    { path : '' , component: LogInComponent} , ] } 
  , {path: '' , redirectTo:'sign-up', pathMatch:'full' },
  {path:'user-profile' , component: UserProfileComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
