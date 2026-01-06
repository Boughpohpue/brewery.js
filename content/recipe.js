import { Is } from './.external/just.js-1.0.1.js';
import Ingredient from './ingredient.js';

export class Recipe {
  ingredients = [];
  constructor(ingredients) {
    if (!Is.thisArray(ingredients) || Is.thisEmpty(ingredients)) {
      throw new Error("Recipe must have ingredients!");
    }
    if (ingredients.some((i) => !(i instanceof Ingredient))) {
      throw new Error("One or more provided ingredients are invalid!");
    }
    this.ingredients = ingredients;
  }
}

export default Recipe;
