import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = { 
  shoppingList: [ 
    new Ingredient('Apples', 5), 
    new Ingredient('Egg', 6)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        shoppingList: [...state.shoppingList, action.payload]
      }
    default:
      return state;
  }
}