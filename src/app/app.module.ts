import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
// Material
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';
// Directives
import { LargeScreenDirective } from './directives/largeScreen/large-screen.directive';
import { SmallScreenDirective } from './directives/smallScreen/small-screen.directive';
import { MiddleScreenDirective } from './directives/middleScreen/middle-screen.directive';

// Services
import {ScreenService} from './services/screen/screen.service';
import {AuthService} from './services/user/auth.service';
import {CategoryService} from './services/category/category.service';

import { ContentComponent } from './content/content.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { AuthoriseComponent } from './components/authorise/authorise.component';
import { AuthModalComponent } from './modals/auth-modal/auth-modal.component';
import { RegisterComponent } from './components/register/register.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import {CookieService} from 'ngx-cookie-service';
// Filters
import {FilterLengthPipe} from './filters/myfilter';
import {AuthInspectorService} from './services/authorise/auth-inspector.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent,
    LargeScreenDirective,
    SmallScreenDirective,
    MiddleScreenDirective,
    ContentComponent,
    RecipeListComponent,
    RecipeComponent,
    RecipeCardComponent,
    FilterLengthPipe,
    AuthoriseComponent,
    AuthModalComponent,
    RegisterComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialFileInputModule,
    MatIconModule  ],
  providers: [ScreenService,
    AuthService,
    CategoryService,
    CookieService,
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInspectorService,
    multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [AuthModalComponent]
})
export class AppModule { }
