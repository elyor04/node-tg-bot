import { Scenes, Markup } from "telegraf";
import Context from "../types/context";
import messages from "../utils/messages";
import getInvoices from "../services/getInvoices";
import logger from "../utils/logger";
import Employee from "../database/models/Employee";
import formatDate from "../utils/formatDate";

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
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getInvoices(employee.cardCode, { days: 1 });

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

    if (!result?.data) {
      await ctx.deleteMessage(messageId);
      await ctx.reply(messages.noPurchasesFound[lang]);
      return;
    }

    const purchases = result.data.map((purchase: any) => {
      const docDate = formatDate(purchase.DocDate, "YYYY-MM-DD HH:mm");

      const docLines = purchase.DocumentLines.map((item: any) => {
        return `ItemDescription: ${item.ItemDescription}\nQuantity: ${item.Quantity}`;
      });

      return `DocDate: ${docDate}\nDocTotal: ${
        purchase.DocTotal
      }\n\nDocumentLines:\n${docLines.join("\n\n")}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(purchases.join("\n\n------------------\n\n"));
  }
);

completedPurchasesScene.hears(
  [messages.oneWeek.uz, messages.oneWeek.ru, messages.oneWeek.en],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getInvoices(employee.cardCode, { weeks: 1 });

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

    if (!result?.data) {
      await ctx.deleteMessage(messageId);
      await ctx.reply(messages.noPurchasesFound[lang]);
      return;
    }

    const purchases = result.data.map((purchase: any) => {
      const docDate = formatDate(purchase.DocDate, "YYYY-MM-DD HH:mm");

      const docLines = purchase.DocumentLines.map((item: any) => {
        return `ItemDescription: ${item.ItemDescription}\nQuantity: ${item.Quantity}`;
      });

      return `DocDate: ${docDate}\nDocTotal: ${
        purchase.DocTotal
      }\n\nDocumentLines:\n${docLines.join("\n\n")}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(purchases.join("\n\n------------------\n\n"));
  }
);

completedPurchasesScene.hears(
  [messages.oneMonth.uz, messages.oneMonth.ru, messages.oneMonth.en],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getInvoices(employee.cardCode, { months: 1 });

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

    if (!result?.data) {
      await ctx.deleteMessage(messageId);
      await ctx.reply(messages.noPurchasesFound[lang]);
      return;
    }

    const purchases = result.data.map((purchase: any) => {
      const docDate = formatDate(purchase.DocDate, "YYYY-MM-DD HH:mm");

      const docLines = purchase.DocumentLines.map((item: any) => {
        return `ItemDescription: ${item.ItemDescription}\nQuantity: ${item.Quantity}`;
      });

      return `DocDate: ${docDate}\nDocTotal: ${
        purchase.DocTotal
      }\n\nDocumentLines:\n${docLines.join("\n\n")}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(purchases.join("\n\n------------------\n\n"));
  }
);

completedPurchasesScene.hears(
  [messages.allTime.uz, messages.allTime.ru, messages.allTime.en],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getInvoices(employee.cardCode, {});

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

    if (!result?.data) {
      await ctx.deleteMessage(messageId);
      await ctx.reply(messages.noPurchasesFound[lang]);
      return;
    }

    const purchases = result.data.map((purchase: any) => {
      const docDate = formatDate(purchase.DocDate, "YYYY-MM-DD HH:mm");

      const docLines = purchase.DocumentLines.map((item: any) => {
        return `ItemDescription: ${item.ItemDescription}\nQuantity: ${item.Quantity}`;
      });

      return `DocDate: ${docDate}\nDocTotal: ${
        purchase.DocTotal
      }\n\nDocumentLines:\n${docLines.join("\n\n")}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(purchases.join("\n\n------------------\n\n"));
  }
);

completedPurchasesScene.hears(
  [messages.backButton.uz, messages.backButton.ru, messages.backButton.en],
  async (ctx) => {
    await ctx.scene.enter("purchaseMenu");
  }
);

export default completedPurchasesScene;
