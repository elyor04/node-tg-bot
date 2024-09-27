import { Scenes, Markup } from "telegraf";
import Context from "../types/context";
import messages from "../utils/messages";

const paymentMenuScene = new Scenes.BaseScene<Context>("paymentMenu");

paymentMenuScene.enter(async (ctx) => {
  const lang = ctx.user?.lang || "en";

  const keyboard = Markup.keyboard([
    [messages.inDebt[lang], messages.addOutgoingPayment[lang]],
    [messages.reviseAct[lang], messages.backButton[lang]],
  ])
    .oneTime()
    .resize();

  await ctx.reply(messages.paymentMenu[lang], keyboard);
});

paymentMenuScene.hears(
  [messages.inDebt.uz, messages.inDebt.ru, messages.inDebt.en],
  async (ctx) => {}
);

paymentMenuScene.hears(
  [
    messages.addOutgoingPayment.uz,
    messages.addOutgoingPayment.ru,
    messages.addOutgoingPayment.en,
  ],
  async (ctx) => {}
);

paymentMenuScene.hears(
  [messages.reviseAct.uz, messages.reviseAct.ru, messages.reviseAct.en],
  async (ctx) => {}
);

paymentMenuScene.hears(
  [messages.backButton.uz, messages.backButton.ru, messages.backButton.en],
  async (ctx) => {
    await ctx.scene.enter("mainMenu");
  }
);

export default paymentMenuScene;
