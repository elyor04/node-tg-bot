import { Scenes, Markup } from "telegraf";
import Context from "../types/context";
import messages from "../utils/messages";
import getInvoices from "../services/getInvoices";
import logger from "../utils/logger";

const completedPurchasesScene = new Scenes.BaseScene<Context>(
  "completedPurchases"
);

completedPurchasesScene.enter(async (ctx) => {
  const lang = ctx.user?.lang || "en";

  const keyboard = Markup.keyboard([
    [messages.oneDay[lang], messages.oneWeek[lang]],
    [messages.oneMonth[lang], messages.allTime[lang]],
    [messages.backButton[lang]],
  ])
    .oneTime()
    .resize();

  await ctx.reply(messages.selectPeriod[lang], keyboard);
});

completedPurchasesScene.hears(
  [messages.oneDay.uz, messages.oneDay.ru, messages.oneDay.en],
  async (ctx) => {
    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getInvoices({ days: 1 });

    if (result?.error) {
      logger.error(result.error);
      await ctx.deleteMessage(messageId);
      await ctx.reply(result.error);
      await ctx.scene.leave();
      return;
    }

    if (!result?.data) {
      await ctx.deleteMessage(messageId);
      await ctx.reply(messages.noPurchasesFound[lang]);
      await ctx.scene.leave();
      return;
    }

    const purchases = result.data.map((purchase) => {
      return `CardName: ${purchase.cardName}\nDocStatus: ${purchase.docStatus}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(purchases.join("\n\n"));
  }
);

completedPurchasesScene.hears(
  [messages.oneWeek.uz, messages.oneWeek.ru, messages.oneWeek.en],
  async (ctx) => {
    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getInvoices({ weeks: 1 });

    if (result?.error) {
      logger.error(result.error);
      await ctx.deleteMessage(messageId);
      await ctx.reply(result.error);
      await ctx.scene.leave();
      return;
    }

    if (!result?.data) {
      await ctx.deleteMessage(messageId);
      await ctx.reply(messages.noPurchasesFound[lang]);
      await ctx.scene.leave();
      return;
    }

    const purchases = result.data.map((purchase) => {
      return `CardName: ${purchase.cardName}\nDocStatus: ${purchase.docStatus}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(purchases.join("\n\n"));
  }
);

completedPurchasesScene.hears(
  [messages.oneMonth.uz, messages.oneMonth.ru, messages.oneMonth.en],
  async (ctx) => {
    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getInvoices({ months: 1 });

    if (result?.error) {
      logger.error(result.error);
      await ctx.deleteMessage(messageId);
      await ctx.reply(result.error);
      await ctx.scene.leave();
      return;
    }

    if (!result?.data) {
      await ctx.deleteMessage(messageId);
      await ctx.reply(messages.noPurchasesFound[lang]);
      await ctx.scene.leave();
      return;
    }

    const purchases = result.data.map((purchase) => {
      return `CardName: ${purchase.cardName}\nDocStatus: ${purchase.docStatus}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(purchases.join("\n\n"));
  }
);

completedPurchasesScene.hears(
  [messages.allTime.uz, messages.allTime.ru, messages.allTime.en],
  async (ctx) => {
    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getInvoices({});

    if (result?.error) {
      logger.error(result.error);
      await ctx.deleteMessage(messageId);
      await ctx.reply(result.error);
      await ctx.scene.leave();
      return;
    }

    if (!result?.data) {
      await ctx.deleteMessage(messageId);
      await ctx.reply(messages.noPurchasesFound[lang]);
      await ctx.scene.leave();
      return;
    }

    const purchases = result.data.map((purchase) => {
      return `CardName: ${purchase.cardName}\nDocStatus: ${purchase.docStatus}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(purchases.join("\n\n"));
  }
);

completedPurchasesScene.hears(
  [messages.backButton.uz, messages.backButton.ru, messages.backButton.en],
  async (ctx) => {
    await ctx.scene.enter("purchaseMenu");
  }
);

export default completedPurchasesScene;
