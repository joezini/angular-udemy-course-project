import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ShoppingEditComponent } from '../../shopping-list/shopping-edit/shopping-edit.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    id: number;

    constructor(private recipeService: RecipeService, 
                private shoppingListService: ShoppingListService,
                private route: ActivatedRoute,
                private router: Router) {}

    addIngredientsToShoppingList() {
      this.shoppingListService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    ngOnInit() {
      this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      )
    }

    onEditRecipe() {
      this.router.navigate(['edit'], {relativeTo: this.route});
    }

    onDeleteRecipe() {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
    }

}