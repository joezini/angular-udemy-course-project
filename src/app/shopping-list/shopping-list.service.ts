import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  shoppingListChanged = new EventEmitter<Ingredient[]>();
  private shoppingList: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Egg', 6)
  ];

  addIngredient(ingredient: Ingredient) {
    this.shoppingList.push(ingredient);
    this.shoppingListChanged.emit(this.shoppingList.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // Not ideal, too many events
    // ingredients.forEach(
    //   (ingredient: Ingredient) => this.addIngredient(ingredient)
    // )
    this.shoppingList.push(...ingredients); // ... is called 'spread', it turns an array into a list, which can be pushed
    this.shoppingListChanged.emit(this.shoppingList.slice());
  }

  getShoppingList() {
    return this.shoppingList.slice();
  }
}