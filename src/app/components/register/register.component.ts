import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {FormControl, Validators} from '@angular/forms';
import {PasswordConfirmValidator} from '../../Validators/PaswordValidator';
import {AuthService} from '../../services/user/auth.service';
import { MatDialog} from '@angular/material';
import { AuthModalComponent} from '../../modals/auth-modal/auth-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user = new User();
  public nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zа-я\s\-.]{1,20}$/i),
  ]);
  public loginFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-z\d]{4,20}$/i),
  ]);
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-z_?!^%()\d]{6,30}$/i),
  ]);
  public passwordConfirmFormControl = new FormControl('', [
    Validators.required,
    PasswordConfirmValidator(this.user),
  ]);

  constructor(private authService: AuthService,
              private registrationDialog: MatDialog) { }

  ngOnInit() {
    // this.user.name = '';
    // this.user.login = '';
    // this.user.email = '';

  }
  openDialog( msg: string ){

    this.registrationDialog.open( AuthModalComponent , {
      data: {
        message: msg
      }
    });

  }//openDialog
  async register(){

    if(this.CheckAllFields() === false){
      return this.openDialog('Поля формы должны быть заполнены корректно!!!');
    }
    try{


      const response = await this.authService.register(this.user);
      console.log('response' , response);
      this.openDialog( response.message );
    }
    catch(ex){
      this.openDialog( ex.message );
    }
  }
  CheckAllFields(): boolean {

    return this.nameFormControl.valid &&
      this.loginFormControl.valid &&
      this.emailFormControl.valid &&
      this.passwordFormControl.valid &&
      this.passwordConfirmFormControl.valid;
  }
}
