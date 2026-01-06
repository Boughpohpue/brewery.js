import IngredientAttributes from './ingredient_attributes.js'

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

export default Ingredient;
