import { Component, OnInit } from '@angular/core';
import { UserService } from '../sign-up/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  dataSource=[];
  displayedColumns: string[] = [ 'fullName', 'email' ];
  constructor( private userServ : UserService , private router : Router) { }

  ngOnInit() {
    this.userServ.getUserProfile().subscribe(
      res=>{
          this.dataSource = res['user']
          console.log(res['user'])
      }
    )
  }
logOut() {
  this.userServ.deletToken();
  this.router.navigateByUrl('/log-in')
}
}
