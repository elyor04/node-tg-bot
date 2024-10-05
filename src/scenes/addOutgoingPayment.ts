import { Scenes, Markup } from "telegraf";
import { Message } from "telegraf/types";
import Context from "../types/context";
import messages from "../utils/messages";
import logger from "../utils/logger";

const addOutgoingPaymentScene = new Scenes.WizardScene<Context>(
  "addOutgoingPayment",

  async (ctx) => {
    const lang = ctx.user?.lang || "en";

    const keyboard = Markup.keyboard([
      ["USD", "UZS"],
      [messages.bankAccountNumber[lang]],
    ])
      .oneTime()
      .resize();

    await ctx.reply(messages.selectPaymentCurrency[lang], keyboard);
    return ctx.wizard.next();
  },

  async (ctx) => {
    const message = ctx?.message as Message.TextMessage;
    if (!(message && message?.text)) return;

    const lang = ctx.user?.lang || "en";

    if (!["USD", "UZS"].includes(message.text)) return;

    // @ts-ignore
    ctx.scene.session.addOutgoingPayment = {
      currency: message.text,
    };

    await ctx.reply(messages.enterPaymentAmount[lang]);
    return ctx.wizard.next();
  },

  async (ctx) => {
    const message = ctx?.message as Message.TextMessage;
    if (!(message && message?.text)) return;

    const lang = ctx.user?.lang || "en";
    ctx.scene.session.addOutgoingPayment.amount = message.text;

    await ctx.reply(messages.leaveComment[lang]);
    return ctx.wizard.next();
  },

  async (ctx) => {
    const message = ctx?.message as Message.TextMessage;
    if (!(message && message?.text)) return;

    const lang = ctx.user?.lang || "en";
    ctx.scene.session.addOutgoingPayment.comment = message.text;

    const keyboard = Markup.keyboard([
      [messages.yesButton[lang], messages.noButton[lang]],
      [messages.editButton[lang]],
    ])
      .oneTime()
      .resize();

    const { currency, amount, comment } = ctx.scene.session.addOutgoingPayment;

    await ctx.reply(
      messages.paymentSummary[lang](currency, amount, comment),
      keyboard
    );
    return ctx.wizard.next();
  },

  async (ctx) => {}
);

addOutgoingPaymentScene.hears(
  [messages.yesButton.uz, messages.yesButton.ru, messages.yesButton.en],
  async (ctx) => {}
);

addOutgoingPaymentScene.hears(
  [messages.noButton.uz, messages.noButton.ru, messages.noButton.en],
  async (ctx) => {
    const lang = ctx.user?.lang || "en";

    const keyboard = Markup.keyboard([
      ["USD", "UZS"],
      [messages.bankAccountNumber[lang]],
    ])
      .oneTime()
      .resize();

    await ctx.reply(messages.enterInfoAgain[lang]);
    await ctx.reply(messages.selectPaymentCurrency[lang], keyboard);

    return ctx.wizard.selectStep(1);
  }
);

addOutgoingPaymentScene.hears(
  [messages.editButton.uz, messages.editButton.ru, messages.editButton.en],
  async (ctx) => {}
);

export default addOutgoingPaymentScene;
