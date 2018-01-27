import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { Store } from '@ngrx/store';
import { Ingredient } from "./ingredient.model";

@Injectable()
export class BackupService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private authService: AuthService,
              private store: Store<{shoppingList: { shoppingList: Ingredient[] }}>) {}

  saveData() {
    const token = this.authService.getToken();
    const data = {
      'recipes': this.recipeService.getRecipes(),
      'shoppingList': this.store.select('shoppingList')
    };
    return this.http.put('https://ng-recipe-book-32a70.firebaseio.com/data.json?auth=' + token, data);
  }

  fetchData() {
    const token = this.authService.getToken();
    this.http.get('https://ng-recipe-book-32a70.firebaseio.com/data.json?auth=' + token)
    .map(
      (response: Response) => {
        const recipes: Recipe[] = response.json()['recipes'];
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return ({
          'recipes': recipes,
          'shoppingList': response.json()['shoppingList']
        });
      }
    )
    .subscribe(
      (response: any) => {
        this.recipeService.updateAllRecipes(response['recipes']);
        this.shoppingListService.updateAllShoppingListItems(response['shoppingList']);
      }
    )
  }
}