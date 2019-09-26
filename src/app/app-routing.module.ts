import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RecipeListComponent} from './components/recipe-list/recipe-list.component';
import {AuthoriseComponent} from './components/authorise/authorise.component';
import {RegisterComponent} from './components/register/register.component';
import {AddRecipeComponent} from './components/add-recipe/add-recipe.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'recipes',
        component: RecipeListComponent,
      },
      {
        path: '',
        component: RecipeListComponent,
      },
      {
        path: 'addRecipe',
        component: AddRecipeComponent,
        canActivate: [AuthGuard]

      },
    ]
  },
  {
    path: 'authorise',
    component: AuthoriseComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
