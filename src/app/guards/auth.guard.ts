import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {

  }// constructor

  canActivate() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigateByUrl('/authorise');
      return false;
    }
    return true;
  }
}
