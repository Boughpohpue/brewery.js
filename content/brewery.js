import { nameof, Is, Bitwiser } from '../lib/just.js-1.0.1.js';
import IngredientAttributes from './ingredient_attributes.js';
import CookBook from './cookbook.js';

export class Brewery {
  static brew(potionName, supplies = null) {
    let potion = CookBook.getArchetype(potionName);
    if (Is.thisNothing(potion)) {
      throw new Error(`${potionName} not found in the cookbook!`);
    }
    let recipe = CookBook.getRecipe(potionName);
    if (Is.thisNothing(recipe)) {
      return Object.create(potion.prototype);
    }
    let mixture = this.prepareMixture(recipe, supplies);
    return Object.create(potion.prototype, JSON.parse(mixture));
  }
  static prepareMixture(recipe, supplies) {
    let mixtureItems = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
      mixtureItems.push(this.prepareItem(recipe.ingredients[i], supplies));
    }
    return `{ ${mixtureItems.join(", ")} }`;
  }
  static prepareItem(ingredient, supplies) {
    let stuffing = this.prepareStuffing(ingredient, supplies).join(", ");
    return `"${ingredient.key}": { ${stuffing} }`;
  }
  static prepareStuffing(ingredient, supplies) {
    let stuffing = [];
    Bitwiser.extract(IngredientAttributes.ParameterStuff).forEach((attr) => {
      let attrVal = ingredient.hasAttribute(attr) ? "true" : "false";
      let stuffling = `"${nameof({ attr }).toLowerCase()}": ${attrVal}`;
      stuffing.push(stuffling);
    });
    stuffing.push(this.marinate(ingredient, supplies));
    return stuffing;
  }
  static marinate(ingredient, supplies) {
    let marinade = ingredient.value;
    let supply = null;
    if (Is.thisArray(supplies)) {
      supply = supplies.find((s) => s.ingredientName == ingredient.key);
      if (Is.thisSomething(supply)) {
        marinade = supply.value;
      }
    }
    return `"value": ${this.spice(marinade, ingredient)}`;
  }
  static spice(marinade, ingredient) {
    if (ingredient.hasAttribute(IngredientAttributes.String)) {
      marinade = `"${marinade}"`;
    }
    return marinade;
  }
}

export default Brewery;
