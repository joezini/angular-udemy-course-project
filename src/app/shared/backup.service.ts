import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';

@Injectable()
export class BackupService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService) {}

  saveData() {
    const data = {
      'recipes': this.recipeService.getRecipes(),
      'shoppingList': this.shoppingListService.getShoppingList()
    };
    return this.http.put('https://ng-recipe-book-32a70.firebaseio.com/data.json', data);
  }

  fetchData() {
    return this.http.get('https://ng-recipe-book-32a70.firebaseio.com/data.json')
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