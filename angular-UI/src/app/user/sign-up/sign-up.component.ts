import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] ,
  
})
export class SignUpComponent implements OnInit {
   emailregx =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   successMessage : boolean ;
   errorMessage   ;
  constructor(public userService : UserService ,private router : Router) { }
 
  ngOnInit() {
    
  }
onsubmit(form : NgForm) {
 this.userService.postUser(form.value).subscribe(
   res=> {
    console.log('inside onsubmit') 
    this.successMessage = true ;
  setTimeout(() => {
    this.successMessage = false ;
  }, 4000);
  form.resetForm(form) ;
  this.router.navigateByUrl('/log-in')
  } ,
   err=> {
     if(err.status == 422){
       this.errorMessage = err.error;
     }
   }
 )
}
restForm(form : NgForm){
  this.userService.selectedUser = {
    fullName : '' ,
    email    : '' ,
    password : '' ,
  }
 
 this.errorMessage= ' '
  form.resetForm()
}
}
