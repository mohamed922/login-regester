import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../sign-up/shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userSer : UserService , private router : Router ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      if(!this.userSer.Islogin()) {
        this.router.navigateByUrl('/log-in')
       this.userSer.deletToken()
      }
    return true;
  }
  
}
