import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ShoppingEditComponent } from '../../shopping-list/shopping-edit/shopping-edit.component';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
    @Input() recipe: Recipe;

    constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService) {}

    addIngredientsToShoppingList() {
      this.shoppingListService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

}