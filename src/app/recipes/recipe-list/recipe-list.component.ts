import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Cheeseburger', 'Yummy cheeseburger', 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Lounge_Burger_Wiki.jpg'),
    new Recipe('Quinotto', 'Yeah hot damn quinotto', 'https://144f2a3a2f948f23fc61-ca525f0a2beaec3e91ca498facd51f15.ssl.cf3.rackcdn.com/uploads/food_portal_data/recipes/recipe/hero_article_image/2290/compressed_Leek_and_Pea_Quinotto_without_22V2jpg_593x426.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
