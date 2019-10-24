import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../sign-up/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  emailregx =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  model = {
    email:'' ,
    password: ''
  }
  errorMessage : string ;
  constructor(private userService : UserService , private router : Router) { }

  ngOnInit() {
    if(this.userService.Islogin()){
      this.router.navigateByUrl('/user-profile')
    }
  }
onSubmit(form : NgForm) {
 this.userService.login(form.value).subscribe(
   res=> {
     this.userService.setToken(res['token'])
     this.router.navigateByUrl('/user-profile')
   },
   err=>{
    setTimeout(() => {
      this.errorMessage = err.error.message;
       
    }, 4000)
 
})
}
}
