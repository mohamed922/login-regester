import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms' ;
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '../material/matrial.module';
import { UserComponent } from './user/user/user.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component'
import { UserService } from './user/sign-up/shared/user.service';
import { AuthGuard } from './user/auth/auth.guard';
import {AuthInterceptor} from './user/auth/auth.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    LogInComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    MaterialModule ,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS ,
    useClass : AuthInterceptor  ,
    multi : true
    
  },UserService , AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
