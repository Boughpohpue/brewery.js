import Is from './.external/just.js-1.0.1.js';

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

export default IngredientAttributes;
