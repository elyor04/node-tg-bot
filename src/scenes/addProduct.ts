import { Scenes, Markup } from "telegraf";
import { CallbackQuery, Message } from "telegraf/types";
import { message } from "telegraf/filters";
import Context from "../types/context";
import messages from "../utils/messages";
import getItems from "../services/getItems";
import logger from "../utils/logger";
import getButtons from "../utils/getButtons";

const addProductScene = new Scenes.BaseScene<Context>("addProduct");

addProductScene.enter(async (ctx) => {
  const lang = ctx.user?.lang || "en";

  ctx.scene.session.addPurchase = {
    // @ts-ignore
    orders: [],
    skip: 0,
  };

  const result = await getItems(11, 0);

  if (result?.error) {
    logger.error(result.error);
    await ctx.reply(result.error);
    await ctx.scene.leave();
    return;
  }

  if (!result?.data) {
    await ctx.reply(messages.noProductsFound[lang]);
    await ctx.scene.leave();
    return;
  }

  const buttons = getButtons(result.data);
  // const keyboard = Markup.keyboard([[messages.backButton[lang]]])
  //   .oneTime()
  //   .resize();

  await ctx.reply(messages.selectProduct[lang], Markup.inlineKeyboard(buttons));
  // await ctx.reply("", keyboard);
});

addProductScene.on("callback_query", async (ctx) => {
  const callbackQuery = ctx.callbackQuery as CallbackQuery.DataQuery;

  const lang = ctx.user?.lang || "en";
  const match = callbackQuery.data.match(/([^:]+):([^:]+)/);

  if (match?.length === 3) {
    ctx.scene.session.addPurchase.order = {
      name: match[1],
      code: match[2],
    };

    await ctx.reply(messages.enterQuantity[lang]);

  } else {
    if (callbackQuery.data === ">>") ctx.scene.session.addPurchase.skip += 10;
    else ctx.scene.session.addPurchase.skip -= 10;

    const result = await getItems(11, ctx.scene.session.addPurchase.skip);

    if (result?.error) {
      logger.error(result.error);
      await ctx.reply(result.error);
      await ctx.scene.leave();
      return;
    }

    if (!result?.data) {
      await ctx.reply(messages.noProductsFound[lang]);
      await ctx.scene.leave();
      return;
    }

    const buttons = getButtons(
      result.data,
      ctx.scene.session.addPurchase.skip > 0
    );

    await ctx.editMessageReplyMarkup({
      inline_keyboard: buttons,
    });
  }

  await ctx.answerCbQuery();
});

addProductScene.hears(
  [
    messages.commentButton.uz,
    messages.commentButton.ru,
    messages.commentButton.en,
  ],
  async (ctx) => {
    const lang = ctx.user?.lang || "en";

    await ctx.reply(messages.leaveComment[lang]);
    await ctx.scene.enter("addPurchase");
  }
);

addProductScene.hears(
  [messages.backButton.uz, messages.backButton.ru, messages.backButton.en],
  async (ctx) => {
    await ctx.scene.enter("purchaseMenu");
  }
);

addProductScene.on(message("text"), async (ctx) => {
  const message = ctx.message as Message.TextMessage;
  const lang = ctx.user?.lang || "en";

  if (ctx.scene.session.addPurchase.order) {
    ctx.scene.session.addPurchase.orders.push({
      ...ctx.scene.session.addPurchase.order,
      quantity: message.text,
    });

    // @ts-ignore
    ctx.scene.session.addPurchase.order = null;

    const keyboard = Markup.keyboard([
      [messages.commentButton[lang], messages.backButton[lang]],
    ])
      .oneTime()
      .resize();

    await ctx.reply(messages.productAdded[lang], keyboard);

  } else {
    await ctx.reply(messages.selectProductFirst[lang]);
  }
});

export default addProductScene;
