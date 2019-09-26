import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {AuthService} from '../../services/user/auth.service';
import {Router} from '@angular/router';
import {ServerResponse} from '../../models/ServerResponse';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  isSmallScreen = false;
  public user: User = new User();
  public serverResponce: ServerResponse;
  constructor(private authService: AuthService,
              private router: Router) {

  }

  ngOnInit() {
    // console.log(this.user);
    this.getCurrentUser();
  }
  ShowSmallScreenMenu() {
    this.isSmallScreen = !this.isSmallScreen;
  }
   async getCurrentUser(){
    try{

      const response =  await this.authService.GetCurrentUser();
  console.log(response);
      if(response.code === 403){
        this.user = null;
        localStorage.removeItem('token');
        this.router.navigateByUrl('/authorise');
      }
      else if(response.code === 200 && response.data != null) {

        if(response.data.token){
          this.user = new User();
          this.user.userName = response.data.user.userName;
          localStorage.setItem('token', response.data.token);
        }//if
        else{
          this.user = new User();
          this.user.userName = response.data.userName;
        }


        console.log(this.user);
      }
      else {
        this.user = null;
      }
    }
    catch(ex){
      console.log(ex);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigateByUrl('/recipes');
  }

}
