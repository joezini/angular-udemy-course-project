import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Cheeseburger',
      'Yummy cheeseburger', 
      'https://upload.wikimedia.org/wikipedia/commons/d/dc/Lounge_Burger_Wiki.jpg', 
      [new Ingredient('Patty', 2), 
       new Ingredient('Burger', 1), 
       new Ingredient('Cheese slice', 1), 
       new Ingredient('Lettuce', 2), 
       new Ingredient('Tomato', 1)]),
    new Recipe(
      'Quinotto', 
      'Yeah hot damn quinotto', 
      'https://144f2a3a2f948f23fc61-ca525f0a2beaec3e91ca498facd51f15.ssl.cf3.rackcdn.com/uploads/food_portal_data/recipes/recipe/hero_article_image/2290/compressed_Leek_and_Pea_Quinotto_without_22V2jpg_593x426.jpg', 
      [new Ingredient('Quinoa', 500), 
       new Ingredient('Stock', 1), 
       new Ingredient('Cheese', 10), 
       new Ingredient('Butternut squash', 1), 
       new Ingredient('Garlic', 4)])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.announceUpdate();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.announceUpdate();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.announceUpdate();
  }

  updateAllRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.announceUpdate();
  }

  announceUpdate() {
    this.recipesChanged.next(this.recipes.slice());
  }

}