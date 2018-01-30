import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from './recipe.actions';

export interface FeatureState {
  recipes: State
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case RecipeActions.DELETE_RECIPE:
      const updatedRecipes = [...state.recipes]
      updatedRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: updatedRecipes
      };
    default:
      return state;
  }
}