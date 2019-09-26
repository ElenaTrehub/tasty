import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/user/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthModalComponent} from '../../modals/auth-modal/auth-modal.component';
import {AuthData} from '../../models/modal.data/AuthData';

@Component({
  selector: 'app-authorise',
  templateUrl: './authorise.component.html',
  styleUrls: ['./authorise.component.css']
})
export class AuthoriseComponent implements OnInit {

  public user: User = new User();

  public loginFormControl = new FormControl('', [Validators.required]);
  public passwordFormControl = new FormControl('', [Validators.required]);


  constructor(private authService: AuthService,
              private router: Router,
              public dialog: MatDialog) {
    this.user.userLogin = '';
    this.user.userPassword = '';
  }

  ngOnInit() {
  }
  async authorize($event) {

    if (this.loginFormControl.hasError('required')){
      return;
    }// if

    if (this.passwordFormControl.hasError('required')){
      return;
    }// if

    const authData: AuthData = new class implements AuthData {
      message: string;
    };
    authData.message = 'Вы вошли!';
    try{

      const response = await this.authService.authorise(this.user);
console.log(response);
      if(response.code === 200) {
        localStorage.setItem('token', response.data);
        console.log(localStorage);
        this.router.navigateByUrl('/recipes');
      }
      else if (response.code === 401){
        this.openDialog({
          message: 'Пользователь с такими данными не найден! Вы можете зарегистрироваться!'

        })}
      else if (response.code === 405){
          this.openDialog({
            message: 'Ваш Email не подтверждён! Вы можете зарегистрироваться!'

          });
      }// else
    }// try
    catch (ex) {
      this.openDialog({
          message: ex
      }
      );
    }// catch
  }
  openDialog( authData: AuthData ): void {

    const dialogRef = this.dialog.open(AuthModalComponent, {
      width: '400px',
      data: authData
    });
  }
}
