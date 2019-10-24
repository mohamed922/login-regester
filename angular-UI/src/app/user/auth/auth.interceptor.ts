import {HttpInterceptor ,HttpRequest , HttpHeaders , HttpHandler,HttpEvent} from '@angular/common/http' ;
import {Injectable} from '@angular/core' ;
import {Router} from '@angular/router' ;
import {UserService} from '../sign-up/shared/user.service'
import {tap} from 'rxjs/operators' ;
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userSer : UserService , private router : Router ){}
    intercept(req : HttpRequest<any> , next : HttpHandler) {
        if(req.headers.get('noauth')) {
            return next.handle(req.clone())
        }else {
            var request = req.clone({
                headers : req.headers.set('authorization' , 'Bearer ' + this.userSer.getToken() )
            })
            return next.handle(request).pipe(
                tap(
                    event=>{
                        if(this.userSer.Islogin()) {
                            this.router.navigateByUrl('/user-profile')
                        }
                    },
                    err=>{
                        if(err.errors.auth == false) {
                            this.router.navigateByUrl('/log-in')
                        }
                    }
                )
            )
        }

    }
}