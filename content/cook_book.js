import { nameof, Is } from './.external/just.js-1.0.1.js';

class CookBook {
  static #_index = new Map();
  static #_recipes = new Map();
  static register(potion, recipe) {
    if (Is.thisNothing(potion) || !Is.thisClass(potion)) {
      return null;
    }

    let potionName = nameof(potion);
    this.#_index.set(potionName, potion);
    if (Is.thisSomething(recipe)) {
      this.#_recipes.set(potionName, recipe);
    }
  }
  static getArchetype(potionName) {
    return this.#_index.get(potionName);
  }
  static getRecipe(potionName) {
    return this.#_recipes.get(potionName);
  }
}

export default CookBook;
