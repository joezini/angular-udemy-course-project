import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList: Observable<{shoppingList: Ingredient[]}>;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList: { shoppingList: Ingredient[] }}>) { }

  ngOnInit() {
    this.shoppingList = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
