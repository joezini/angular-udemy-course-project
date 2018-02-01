import { Effect, Actions } from "@ngrx/effects";
import * as RecipeActions from '../store/recipe.actions';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromRecipe from './recipe.reducers'
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
  .ofType(RecipeActions.FETCH_RECIPES)
  .switchMap((action: RecipeActions.FetchRecipes) => {
    return this.httpClient.get<{recipes: Recipe[], shoppingList: Ingredient[]}>('https://ng-recipe-book-32a70.firebaseio.com/data.json')
  })
  .mergeMap(
    (data) => {
      for (let recipe of data.recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return [{
        type: RecipeActions.SET_RECIPES,
        payload: data.recipes
      },{
        type: ShoppingListActions.UPDATE_ALL_INGREDIENTS,
        payload: data.shoppingList
      }]
    }
  );

  @Effect()
  recipeStore = this.actions$
  .ofType(RecipeActions.STORE_RECIPES)
  .withLatestFrom(this.store.select('recipes'))
  .switchMap(([action, state]) => {
    // const data = {
    //   'recipes': state.recipes,
    //   'shoppingList': state.shoppingList
    // };
    return this.httpClient.put('https://ng-recipe-book-32a70.firebaseio.com/data.json', state.recipes);
  });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}