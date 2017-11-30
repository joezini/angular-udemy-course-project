import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingList = this.shoppingListService.getShoppingList();
    this.shoppingListService.shoppingListChanged.subscribe(
      (shoppingList: Ingredient[]) => {
        this.shoppingList = shoppingList;
      }
    );
  }

}
