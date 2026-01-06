import { nameof, Is, Matcher, Bitwiser } from './lib.js-1.0.1.js';


/* POTIONS BREWERY SERVICE (objects factory really ;)) */

export class IngredientAttributes {
  static None = 0n;
  static Default = 1n << 0n;
  static DefaultNull = 1n << 2n;
  static DefaultUndefined = 1n << 3n;
  static Configurable = 1n << 4n;
  static Enumerable = 1n << 5n;
  static Writable = 1n << 6n;
  static Boolean = 1n << 7n;
  static Number = 1n << 8n;
  static Bigint = 1n << 9n;
  static String = 1n << 10n;
  static Symbol = 1n << 11n;
  static Object = 1n << 12n;
  static Array = 1n << 13n;
  static Function = 1n << 14n;
  static Anonymous = 1n << 15n;
  static ParameterStuff = IngredientAttributes.Writable | IngredientAttributes.Enumerable | IngredientAttributes.Configurable;
  static get list() {
    let items = [];
    for (const key in IngredientAttributes) {
      if (Is.thisBigInt(IngredientAttributes[key])) {
        items.push(IngredientAttributes[key]);
      }
    }
    return items;
  }
}

export class Ingredient {
  key;
  value;
  attributes;
  constructor(attributes, key, value = null) {
    this.key = key;
    this.value = value;
    this.attributes = attributes;
  }
  hasAttribute(expected) {
    return (this.attributes & expected) > 0;
  }
}

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

export class CustomSupply {
  ingredientName;
  value;
  constructor(ingredientName, value) {
    this.ingredientName = ingredientName;
    this.value = value;
  }
}

export class CookBook {
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

export class Wizard {
  static #todo = Promise.resolve();

  static brewPotion(potionName, supplies = null) {
    const brewPotionJob = () => this.#brewPotionJob(potionName, supplies);
    this.#todo = this.#todo.then(brewPotionJob, brewPotionJob);
    console.log(`🧙‍♂️ Wizard says: 👍 Agree, I shall brew the ${potionName} for you.`);
    return this.#todo;
  }
  static craftPotion(potionName, supplies = null, chants = null) {
    const craftPotionJob = () => this.#craftPotionJob(potionName, supplies, chants);
    this.#todo = this.#todo.then(craftPotionJob, craftPotionJob);
    console.log(`🧙‍♂️ Wizard says: 👍 Agree, I shall craft the ${potionName} for you.`);
    return this.#todo;
  }
  static enchantPotion(potion, chants = null) {
    const enchantPotionJob = () => this.#enchantPotionJob(potion, chants);
    this.#todo = this.#todo.then(enchantPotionJob, enchantPotionJob);
    console.log(`🧙‍♂️ Wizard says: 👍 Agree, I shall enchant this ${nameof(potion)} for you.`);
    return this.#todo;
  }

  static async #brewPotionJob(potionName, supplies = null) {
    await this.#sleep(369);
    console.log(`🧙‍♂️ Wizard brews: 🫕 ${potionName}`);
    await this.#sleep(693);
    const potion = Brewery.brew(potionName, supplies);
    await this.#sleep(396);
    return potion;
  }
  static async #craftPotionJob(potionName, supplies = null, chants = null) {
    await this.#sleep(369);
    console.log(`🧙‍♂️ Wizard crafts: ⚡ ${potionName}`);
    let potion = await this.#brewPotionJob(potionName, supplies);
    await this.#sleep(693);
    return await this.#enchantPotionJob(potion, chants);
  }
  static async #enchantPotionJob(potion, chants) {
    if (Is.thisArray(chants)) {
      for (let i = 0; i < chants.length; i++) {
        await this.#sleep(963);
        let chant = Matcher.detag(chants[i], potion);
        console.log(`🧙‍♂️ Wizard chants: 🪄 ${nameof(potion)}! ${chant}!!`);
      }
    }
    await this.#sleep(639);
    return potion;
  }
  static #sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}

/* *** * *** */

export default Wizard;