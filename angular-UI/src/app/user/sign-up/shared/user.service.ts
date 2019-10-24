import { Injectable } from '@angular/core';
import {User} from './user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 selectedUser : User = {
  fullName : '' ,
  email    : '' ,
  password : '' ,
 }
  constructor(private http : HttpClient) { }
   noAuth = {headers : new HttpHeaders({'noauth' :'true'})}
  // http requests
  postUser(user: User) {
    return this.http.post(environment.apiUri +'/register' , user , this.noAuth) ;
  }
  login(userCredentials) {
    return this.http.post(environment.apiUri +'/authenticate' , userCredentials , this.noAuth)
  }
  getUserProfile() {
    return this.http.get(environment.apiUri +'/userprofile')
  }
  // token methods
  setToken(token: string) {
    localStorage.setItem('token' , token)
  }
  deletToken() {
    localStorage.removeItem('token')
  }
  getToken() {
   var token =  localStorage.getItem('token') ;
   if(token) {
   var  userInformation = atob(token.split('.')[1])
   return JSON.parse(userInformation) ;
   }else {
     return null ;
   }
  }
  Islogin() {
    var info = this.getToken()
    if(info)  return info.exp > Date.now() / 1000 ;
    else return false 
  }
}
