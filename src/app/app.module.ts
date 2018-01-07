import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './shared/dropdown.directive'
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeSelectMessageComponent } from './recipes/recipe-select-message/recipe-select-message.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    DropdownDirective,
    RecipeSelectMessageComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
