import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Ingredient } from "./ingredient.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class BackupService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {}

  saveData() {
    const data = {
      'recipes': this.recipeService.getRecipes(),
      'shoppingList': this.store.select('shoppingList').select('shoppingList')
    };
    return this.httpClient.put('https://ng-recipe-book-32a70.firebaseio.com/data.json', data);
  }

  fetchData() {
    this.httpClient.get<{recipes: Recipe[], shoppingList: Ingredient[]}>('https://ng-recipe-book-32a70.firebaseio.com/data.json')
    .map(
      (data) => {
        for (let recipe of data.recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return ({
          'recipes': data.recipes,
          'shoppingList': data.shoppingList
        });
      }
    )
    .subscribe(
      (response: any) => {
        this.recipeService.updateAllRecipes(response['recipes']);
        this.store.dispatch(new ShoppingListActions.UpdateAllIngredients(response['shoppingList']));
      }
    )
  }
}