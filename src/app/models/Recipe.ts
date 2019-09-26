'use strict';

import {Category} from './Category';
import {User} from './User';
import {RecipePhoto} from './ResipePhoto';

export class Recipe{
  public recipeID: number;
  public recipeTitle: string;
  public category: Category;
  public user: User;
  public calory: number;
  public recipeDescription: string;
  public ingredients: string;
  public likes: number;
  public dislikes: number;
  public timePrepare: number;
  public photos: RecipePhoto[];

  constructor(){

  }
}
