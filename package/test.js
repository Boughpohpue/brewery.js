import { nameof, Matcher } from './lib/just.js-1.0.1.js';
import { CustomSupply, Wizard } from './brewery-1.0.1.js';
import { BasicPotion, PanoramixSpecial, GummiberryJuice, LovePotion } from './potions.js';


/* TESTING BREWERY WITH WIZARD */

(async () => {
  let potion_1 = await Wizard.craftPotion(nameof(BasicPotion), [], [`${Matcher.entag("foo")}`]);
  console.warn(`${nameof({ potion_1 })} is a ${nameof(potion_1)}<br />`);

  let potion_2 = await Wizard.craftPotion(nameof(PanoramixSpecial), [], [`${Matcher.entag("foo")}`]);
  console.warn(`${nameof({ potion_2 })} is a ${nameof(potion_2)}<br />`);

  let potion_3 = await Wizard.craftPotion(nameof(GummiberryJuice), [], [`${Matcher.entag("foo")}`, `${Matcher.entag("bar")}`]);
  console.warn(`${nameof({ potion_3 })} is a ${nameof(potion_3)}<br />`);

  let potion_4 = await Wizard.craftPotion(
    nameof(GummiberryJuice),
    [new CustomSupply("foo", 369), new CustomSupply("bar", "sTupiT igTHorN")],
    [`${Matcher.entag("foo")}`, `${Matcher.entag("bar")}`]
  );
  console.warn(`${nameof({ potion_4 })} is a ${nameof(potion_4)}<br />`);

  let potion_5 = await Wizard.craftPotion(
    nameof(LovePotion),
    [new CustomSupply("from", "Romeo"), new CustomSupply("to", "Juliette"), new CustomSupply("enchant", "'Amor est omnia' 💗")],
    [
      "✨ Grinding stardust...",
      "💫 Mixing moonlight with whispers...",
      `❤️ Infusing with love from ${Matcher.entag("from")} to ${Matcher.entag("to")}...`,
      `🔮 Binding the souls: ${Matcher.entag("enchant")}`,
      "🌙 Sealing the bond with eternal light...",
      `💗 Their love shall last forever. ${Matcher.entag("enchant")}`,
    ]
  );
  console.warn(`${nameof({ potion_5 })} is a ${nameof(potion_5)}<br />`);
})();

/* *** * *** */
