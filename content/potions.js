import IngredientAttributes from './ingredient_attributes.js';
import Ingredient from './ingredient.js';
import Recipe from './recipe.js';
import CookBook from './cookbook.js';

export class BasicPotion {
  static _foo = 12;
  constructor() {}
  get foo() {
    return this.constructor._foo;
  }
}
CookBook.register(BasicPotion);

export class PanoramixSpecial {
  foo;
  constructor(foo) {
    this.foo = foo;
  }
}
CookBook.register(
  PanoramixSpecial,
  new Recipe([new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.Number, "foo", 144)])
);

export class GummiberryJuice {
  foo;
  bar;
  constructor(foo, bar) {
    this.foo = foo;
    this.bar = bar;
  }
}
CookBook.register(
  GummiberryJuice,
  new Recipe([
    new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.Number, "foo", 69),
    new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.String, "bar", "Toadie stinkz!"),
  ])
);

export class LovePotion {
  enchant;
  from;
  to;
  constructor(enchant, from, to) {
    this.loveEnchant = enchant;
    this.from = from;
    this.to = to;
  }
}
CookBook.register(
  LovePotion,
  new Recipe([
    new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.String, "from", "_from"),
    new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.String, "to", "_to"),
    new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.String, "enchant", "_enchant"),
  ])
);
