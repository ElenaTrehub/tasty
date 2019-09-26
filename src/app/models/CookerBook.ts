'use strict';

import {Recipe} from './Recipe';
import {User} from './User';

export class CookerBook{
  public id: number;
  public recires: Recipe[];
  public user: User;

  constructor(){};
}
