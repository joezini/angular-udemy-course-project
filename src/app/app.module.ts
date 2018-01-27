import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
