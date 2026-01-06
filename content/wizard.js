import { nameof, Is, Matcher } from './.external/just.js-1.0.1.js';
import Brewery from './brewery.js';

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

export default Wizard;
