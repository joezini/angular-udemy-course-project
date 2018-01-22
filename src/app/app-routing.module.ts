import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { HomeComponent } from './core/home/home.component';
import { PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' }
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}