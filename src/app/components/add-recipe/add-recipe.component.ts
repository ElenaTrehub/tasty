import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {Category} from '../../models/Category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category/category.service';
import {Ingredient} from '../../models/Ingredient';
import {MatDialog} from '@angular/material';
import {AuthModalComponent} from '../../modals/auth-modal/auth-modal.component';
import {forEach} from '@angular/router/src/utils/collection';
import {RecipeService} from '../../services/recipe/recipe.service';
import {AuthData} from '../../models/modal.data/AuthData';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  public selectedCategory: number;
  public recipe: Recipe = new Recipe();
  public categories: Array<Category>;

  public currentIngredient: Ingredient = new Ingredient();

  public ingredients: Array<Ingredient> = [];

  public titleFormControl = new FormControl('', [Validators.required,
    Validators.pattern(/^[а-яa-z0-9\s]{4,20}$/i)]);

  public categoryFormControl = new FormControl('', [Validators.required]);

  public ingredientTitleFormControl = new FormControl('', []);

 public ingredientCountFormControl = new FormControl('', []);

  public unitsFormControl = new FormControl('', []);

  public descriptionFormControl = new FormControl('', [Validators.required,
    Validators.pattern(/[a-zа-я0-9\s.?!&\-+:;*%@#_№'"()\]\[]{1,1500}$/i)]);

  public caloryFormControl = new FormControl('', [Validators.required,
    Validators.pattern(/^[0-9]{1,20}$/i)]);

  public timeFormControl = new FormControl('', [Validators.required,
    Validators.pattern(/^[0-9]{1,20}$/i)]);
  public multiplefile = new FormControl('');

  @ViewChild('deleteIng') myDiv: ElementRef;

  constructor(private categoryService: CategoryService,
              private ingredientDialog: MatDialog,
              private elRef: ElementRef,
              private recipeService: RecipeService,
              private router: Router) {}

  ngOnInit() {
    this.GetCategories();
  }

  async GetCategories() {
    try {
      const response = await this.categoryService.getCategories();

      if (response.code === 200) {
        this.categories = response.data as Category[];
        // console.log(this.categories);
      }
    }
    catch(ex) {
      console.log(ex);
    }
  }

  openDialog(msg: string){
    this.ingredientDialog.open( AuthModalComponent, {
      data: {
        message: msg
      }
    });
  }

  addIngredient(){



    if(/^[а-яa-z0-9]{2,20}$/i.test(this.currentIngredient.ingredientTitle) === false){
     return this.openDialog('Есть ошибки в названии ингридиента!');
    }
    if(/^[0-9]{1,20}$/i.test(this.currentIngredient.ingredientCount.toString()) === false){
      return this.openDialog('Введите корректное значение ингридиента!');
    }
    if(/^[а-яa-z.\s]{1,20}$/i.test(this.currentIngredient.ingredientUnit) === false){
      return this.openDialog('Есть ошибки в единицах измерения ингридиента!');
    }
    for(let i = 0; i < this.ingredients.length; i++) {
      if(this.ingredients[i].ingredientTitle === this.currentIngredient.ingredientTitle){
        return this.openDialog('Ингридиент с таким названием уже есть!');
      }
    }

    this.ingredients.push(this.currentIngredient);
    this.currentIngredient = new Ingredient();



  }// addIngredient


  DeleteIngredient(ing: Ingredient){

    if(ing){
      const index = this.ingredients.indexOf(ing);
      this.ingredients.splice(index, 1);
    }
    else{
      return this.openDialog('Выбирите элемент для удаления!');
    }
  }

  async AddRecipe(){

    try{
      if(this.CheckRecipeFields() === false){
        return this.openDialog('Форма рецепта заполнена некорректно!');
      }// if

      if(this.selectedCategory){
        // console.log(this.selectedCategory);
        const categoryResponse = await this.categoryService.getCategoryByID(this.selectedCategory);
        //console.log( categoryResponse);
        if(categoryResponse.code === 200){

          this.recipe.category = categoryResponse.data as Category;
         // console.log(this.recipe.category);

        }// if

      }// if

      if(this.ingredients.length > 0){

        this.recipe.ingredients = '';

        [].forEach.call(this.ingredients, (ing) =>{
          this.recipe.ingredients += ing.ingredientTitle + ': '  + ing.ingredientCount.toString() + ' ' + ing.ingredientUnit + ';';
        });

      }

//console.log(this.multiplefile.value);
      const recipeResponse = await this.recipeService.AddRecipe(this.recipe, this.multiplefile.value);
      console.log(recipeResponse);
      this.openDialog( recipeResponse.message );
      if(recipeResponse.code === 403){
        localStorage.removeItem('token');
        this.router.navigateByUrl('/authorise');
      }
      else if (recipeResponse.code === 200 && recipeResponse.data){
        localStorage.setItem('token', recipeResponse.data);
      }

      // if ( event instanceof KeyboardEvent && event.code === 'Enter' ) {
        // this.openDialog(recipeResponse.message);
      // }// if
     //  else if ( event instanceof  MouseEvent){
        // this.openDialog(recipeResponse.message);
     // }// else if
    }
    catch(ex){
      console.log(ex);

      this.openDialog(ex);
    }


  }// AddRecipe

  CheckRecipeFields(): boolean {
    return this.titleFormControl.valid &&
      this.descriptionFormControl.valid &&
      this.caloryFormControl.valid &&
      this.timeFormControl.valid &&
      this.ingredients.length > 0 &&
      this.categoryFormControl.valid;

  }// CheckRecipeFields

}
