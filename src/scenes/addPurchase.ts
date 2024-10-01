import { Scenes, Markup } from "telegraf";
import { Message } from "telegraf/types";
import Context from "../types/context";
import messages from "../utils/messages";
import addPurchaseData from "./utils/addPurchaseData";

const addPurchaseScene = new Scenes.WizardScene<Context>(
  "addPurchase",

  async (ctx) => {
    const lang = ctx.user?.lang || "en";
    ctx.scene.session.addPurchase = addPurchaseData.get();
    await ctx.reply(messages.leaveComment[lang]);
    await ctx.wizard.next();
  },

  async (ctx) => {
    const message = ctx?.message as Message.TextMessage;
    if (!(message && message?.text)) return;

    const lang = ctx.user?.lang || "en";
    ctx.scene.session.addPurchase.comment = message.text;

    const keyboard = Markup.keyboard([
      [
        messages.yesButton[lang],
        messages.noButton[lang],
        messages.editButton[lang],
      ],
    ])
      .oneTime()
      .resize();

    ctx.reply(
      messages.ordersSummary[lang](
        ctx.scene.session.addPurchase.orders,
        ctx.scene.session.addPurchase.comment
      ),
      keyboard
    );
  }
);

addPurchaseScene.hears(
  [messages.yesButton.uz, messages.yesButton.ru, messages.yesButton.en],
  async (ctx) => {}
);

addPurchaseScene.hears(
  [messages.noButton.uz, messages.noButton.ru, messages.noButton.en],
  async (ctx) => {}
);

addPurchaseScene.hears(
  [messages.editButton.uz, messages.editButton.ru, messages.editButton.en],
  async (ctx) => {}
);

export default addPurchaseScene;
