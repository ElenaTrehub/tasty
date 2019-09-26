import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../../models/Recipe';
import {ServerResponse} from '../../models/ServerResponse';
import {FileInput} from 'ngx-material-file-input';
import {ApiRoutes} from '../../models/ApiRoutes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  async AddRecipe(recipe: Recipe, files: FileInput): Promise<ServerResponse>{

    const formData = new FormData();

    if ( files) {

      [].forEach.call(files.files , ( file ) => {

        formData.append('images[]' , file);

      });
    }

    formData.append('recipeTitle', recipe.recipeTitle);
    formData.append('calory', recipe.calory.toString());
    formData.append('description', recipe.recipeDescription);
    formData.append('ingredients', recipe.ingredients);
    formData.append('timePrepare', recipe.timePrepare.toString());
    formData.append('categoryID', recipe.category.categoryID.toString());

// console.log(formData.getAll('images'))
    return this.http.post(`${ApiRoutes.SERVER_URL}${ApiRoutes.RECIPE_ADD}`,
      formData).toPromise() as Promise<ServerResponse>;
  }//  AddRecipe

  async GetRecipes(offset: number): Promise<ServerResponse>{
    return this.http.get(`${ApiRoutes.SERVER_URL}${ApiRoutes.GET_RECIPES}${offset}`).toPromise() as Promise<ServerResponse>;
  }// GetRecipes
}
