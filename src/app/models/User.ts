'use strict';

import {CookerBook} from './CookerBook';
import {UserPhoto} from './UserPhoto';

export class User {
  public userID: number;
  public userLogin: string;
  public userPassword: string;
  public userConfirmPassword: string;
  public userName: string;
  public userEmail: string;
  public cookerBook: CookerBook;
  public userPhoto: UserPhoto;

  constructor(){

  }

}
