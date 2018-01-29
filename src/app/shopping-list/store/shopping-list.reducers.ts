import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface State {
  shoppingList: Ingredient[];
  editedItem: Ingredient;
  editedItemIndex: number;
}

const initialState: State = { 
  shoppingList: [ 
    new Ingredient('Apples', 5), 
    new Ingredient('Egg', 6)
  ],
  editedItem: null,
  editedItemIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        shoppingList: [...state.shoppingList, action.payload]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        shoppingList: [...state.shoppingList, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const shoppingListItem = state.shoppingList[state.editedItemIndex];
      const updatedShoppingListItem = {
        ...shoppingListItem,
        ...action.payload.shoppingListItem
      };
      const newShoppingListUpdate = [...state.shoppingList];
      newShoppingListUpdate[state.editedItemIndex] = updatedShoppingListItem;
      return {
        ...state,
        shoppingList: newShoppingListUpdate,
        editedItem: null,
        editedItemIndex: -1
      };
    case ShoppingListActions.UPDATE_ALL_INGREDIENTS:
      return {
        ...state,
        shoppingList: action.payload
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const newShoppingListDelete = [...state.shoppingList];
      newShoppingListDelete.splice(state.editedItemIndex, 1);
      return {
        ...state,
        shoppingList: newShoppingListDelete,
        editedItem: null,
        editedItemIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      const editedItem = {...state.shoppingList[action.payload]}; 
      return {
          ...state,
          editedItem: editedItem,
          editedItemIndex: action.payload
        };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedItem: null,
        editedItemIndex: -1
      };
    default:
      return state;
  }
}