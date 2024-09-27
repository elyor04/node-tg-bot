import { Scenes, Markup } from "telegraf";
import Context from "../types/context";
import messages from "../utils/messages";

const mainMenuScene = new Scenes.BaseScene<Context>("mainMenu");

mainMenuScene.enter(async (ctx) => {
  const lang = ctx.user?.lang || "en";

  const keyboard = Markup.keyboard([
    [messages.purchases[lang], messages.payments[lang]],
  ])
    .oneTime()
    .resize();

  await ctx.reply(messages.mainMenu[lang], keyboard);
});

mainMenuScene.hears(
  [messages.purchases.uz, messages.purchases.ru, messages.purchases.en],
  async (ctx) => {
    await ctx.scene.enter("purchaseMenu");
  }
);

mainMenuScene.hears(
  [messages.payments.uz, messages.payments.ru, messages.payments.en],
  async (ctx) => {
    await ctx.scene.enter("paymentMenu");
  }
);

export default mainMenuScene;
