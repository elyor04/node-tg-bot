import { Scenes, Markup } from "telegraf";
import { Message } from "telegraf/types";
import Context from "../types/context";
import messages from "../utils/messages";
import addPurchaseData from "./utils/addPurchaseData";
import postQuotation from "../services/postQuotation";
import logger from "../utils/logger";
import Employee from "../database/models/Employee";

const addPurchaseScene = new Scenes.WizardScene<Context>(
  "addPurchase",

  async (ctx) => {
    const lang = ctx.user?.lang || "en";
    ctx.scene.session.addPurchase = addPurchaseData.get();
    await ctx.reply(messages.leaveComment[lang]);
    return ctx.wizard.next();
  },

  async (ctx) => {
    const message = ctx?.message as Message.TextMessage;
    if (!(message && message?.text)) return;

    const lang = ctx.user?.lang || "en";
    ctx.scene.session.addPurchase.comment = message.text;

    const keyboard = Markup.keyboard([
      [messages.yesButton[lang], messages.noButton[lang]],
      [messages.editButton[lang]],
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

    return ctx.wizard.next();
  },

  async (ctx) => {}
);

addPurchaseScene.hears(
  [messages.yesButton.uz, messages.yesButton.ru, messages.yesButton.en],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await postQuotation(
      employee.cardCode,
      ctx.scene.session.addPurchase.comment,
      ctx.scene.session.addPurchase.orders
    );

    if (result?.error) {
      logger.error(result.error);
      await ctx.deleteMessage(messageId);
      await ctx.reply(result.error, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
      await ctx.scene.leave();
      return;
    }

    await ctx.deleteMessage(messageId);
    await ctx.reply(messages.purchaseAdded[lang]);
    await ctx.scene.enter("purchaseMenu");
  }
);

addPurchaseScene.hears(
  [messages.noButton.uz, messages.noButton.ru, messages.noButton.en],
  async (ctx) => {
    const lang = ctx.user?.lang || "en";

    await ctx.reply(messages.processCancelled[lang], {
      reply_markup: {
        remove_keyboard: true,
      },
    });

    await ctx.scene.enter("purchaseMenu");
  }
);

addPurchaseScene.hears(
  [messages.editButton.uz, messages.editButton.ru, messages.editButton.en],
  async (ctx) => {
    const lang = ctx.user?.lang || "en";
    await ctx.reply(messages.enterInfoAgain[lang]);
    await ctx.scene.enter("addProduct");
  }
);

export default addPurchaseScene;
