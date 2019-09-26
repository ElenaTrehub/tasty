import { Component, OnInit, NgModule } from '@angular/core';
import { Category } from '../../models/Category';
import { ScreenService } from '../../services/screen/screen.service';
import {Recipe} from '../../models/Recipe';
import {RecipePhoto} from '../../models/ResipePhoto';
import {User} from '../../models/User';
import {CategoryService} from '../../services/category/category.service';
import {RecipeService} from '../../services/recipe/recipe.service';
import {AuthModalComponent} from '../../modals/auth-modal/auth-modal.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  categories: Category[];
  calerySort: number;
  timeSort: number;
  countRecipe: number;
  isShowFilter: boolean;
  recipes = [];
  offset: number;
  maxRecipes: boolean;

  sortArray = ['По популярности', 'По времени приготовления', 'Калории по возростанию', 'Калории по убыванию']
  constructor(private screenService: ScreenService,
              private categoryService: CategoryService,
              private recipeService: RecipeService,
              private recipeDialog: MatDialog) {
    this.screenService.resize$.subscribe(() =>  this.ObsShowFilters());
  }

  ngOnInit() {
    this.isShowFilter = !this.screenService.isSmall();
    this.countRecipe = 0;
    this.offset = 0;
    this.maxRecipes = false;

    this.GetCategories();
    this.GetRecipes();
  }
  ObsShowFilters(): void {
    if (this.screenService.isSmall()) {
      this.isShowFilter = false;
    }
    else{
      this.isShowFilter = true;
    }
  }
  ShowFilters(): void {
    this.isShowFilter = !this.isShowFilter;
  }

  async GetCategories(){
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
  }// getCategories
  async GetRecipes(){

    const result = await this.recipeService.GetRecipes(this.offset);
console.log(result);
    if(result.code === 200){

      this.recipes = result.data.recipes;
      this.countRecipe = result.data.count;
    }// if
    else {
      this.recipes = null;
    }// elselet


  }// getRecipes

  async AddLots(){
    this.offset += 8;
    const result = await this.recipeService.GetRecipes(this.offset);
    // console.log(result);
    if(result.code === 200){

      this.recipes = this.recipes.concat(result.data.recipes);
    if(this.recipes.length >= this.countRecipe){
      this.maxRecipes = true;
    }//if
    }// if
    else {
      return this.openDialog('Не удалось получить новые рецепты!');
    }// else
  }// AddLots

  openDialog(msg: string){
    this.recipeDialog.open( AuthModalComponent, {
      data: {
        message: msg
      }
    });
  }
}
