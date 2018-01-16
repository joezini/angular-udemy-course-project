import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
  shoppingListChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private shoppingList: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Egg', 6)
  ];

  addIngredient(ingredient: Ingredient) {
    this.shoppingList.push(ingredient);
    this.shoppingListChanged.next(this.shoppingList.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // Not ideal, too many events
    // ingredients.forEach(
    //   (ingredient: Ingredient) => this.addIngredient(ingredient)
    // )
    this.shoppingList.push(...ingredients); // ... is called 'spread', it turns an array into a list, which can be pushed
    this.shoppingListChanged.next(this.shoppingList.slice());
  }

  getShoppingList() {
    return this.shoppingList.slice();
  }

  getShoppingListItem(index: number) {
    return this.shoppingList[index];
  }

  updateShoppingListItem(index: number, newShoppingListItem: Ingredient) {
    this.shoppingList[index] = newShoppingListItem;
    this.shoppingListChanged.next(this.shoppingList.slice());
  }

  deleteShoppingListItem(index: number) {
    this.shoppingList.splice(index, 1);
    this.shoppingListChanged.next(this.shoppingList.slice());
  }
}