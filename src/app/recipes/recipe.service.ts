import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Bacon Cheddar Potato Skins',
  //             'Wondering how to make potato skins taste great? Both crisp and hearty, this restaurant-quality snack is one that is often requested by my family. ',
  //             'https://www.tasteofhome.com/wp-content/uploads/2017/10/Bacon-Cheddar-Potato-Skins_EXPS_THSO17_9266_C04_21_6b-1.jpg?resize=700%2C700',
  //             [
  //               new Ingredient('Potatoes', 4),
  //               new Ingredient('Bacon', 8),
  //               new Ingredient('Onions', 4),
  //             ]),
  //   new Recipe('Healthy Peach Crisp',
  //             'Let the flavor of fresh peaches shine!',
  //             'https://www.tasteofhome.com/wp-content/uploads/2023/07/DSC9561-Healthy-Peach-Crisp.jpg?resize=768%2C512',
  //             [
  //               new Ingredient('Peaches', 7),
  //               new Ingredient('Oats', 1),
  //               new Ingredient('Apples', 4),
  //             ])
  // ];
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
