import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';   // constant to specify action type

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;                 // must be implemented for Action interface
  payload: Ingredient;                            // add this _if_ the action has a payload
}

export type ShoppingListActions = AddIngredient;