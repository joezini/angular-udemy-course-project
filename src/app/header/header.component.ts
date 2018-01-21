import { Component } from '@angular/core';
import { BackupService } from '../shared/backup.service';
import { Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  constructor(private backupService: BackupService,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService) {}

  onSaveData() {
    this.backupService.saveData().subscribe(
      (response: Response) => console.log(response),
      (error) => console.log(error)
    );
  }
  
  onFetchData() {
    this.backupService.fetchData();
  }
}
