import { Scenes, Markup } from "telegraf";
import Context from "../types/context";
import messages from "../utils/messages";
import getQuotations from "../services/getQuotations";
import logger from "../utils/logger";
import getOrders from "../services/getOrders";
import getDeliveryNotes from "../services/getDeliveryNotes";
import Employee from "../database/models/Employee";
import formatDate from "../utils/formatDate";

const purchaseMenuScene = new Scenes.BaseScene<Context>("purchaseMenu");

purchaseMenuScene.enter(async (ctx) => {
  const lang = ctx.user?.lang || "en";

  const keyboard = Markup.keyboard([
    [messages.addPurchase[lang], messages.ordersInProgress[lang]],
    [messages.confirmedOrders[lang], messages.ordersOnWay[lang]],
    [messages.completedPurchases[lang], messages.backButton[lang]],
  ])
    .oneTime()
    .resize();

  await ctx.reply(messages.purchaseMenu[lang], keyboard);
});

purchaseMenuScene.hears(
  [messages.addPurchase.uz, messages.addPurchase.ru, messages.addPurchase.en],
  async (ctx) => {
    await ctx.scene.enter("addProduct");
  }
);

purchaseMenuScene.hears(
  [
    messages.ordersInProgress.uz,
    messages.ordersInProgress.ru,
    messages.ordersInProgress.en,
  ],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getQuotations(employee.cardCode);

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
      await ctx.reply(messages.noOrdersFound[lang]);
      return;
    }

    const orders = result.data.map((order: any) => {
      const docDate = formatDate(order.DocDate, "YYYY-MM-DD HH:mm");

      const docLines = order.DocumentLines.map((item: any) => {
        return `ItemDescription: ${item.ItemDescription}\nQuantity: ${item.Quantity}`;
      });

      return `DocDate: ${docDate}\nDocTotal: ${
        order.DocTotal
      }\n\nDocumentLines:\n${docLines.join("\n\n")}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(orders.join("\n\n------------------\n\n"));
  }
);

purchaseMenuScene.hears(
  [
    messages.confirmedOrders.uz,
    messages.confirmedOrders.ru,
    messages.confirmedOrders.en,
  ],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getOrders(employee.cardCode);

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
      await ctx.reply(messages.noOrdersFound[lang]);
      return;
    }

    const orders = result.data.map((order: any) => {
      const docDate = formatDate(order.DocDate, "YYYY-MM-DD HH:mm");

      const docLines = order.DocumentLines.map((item: any) => {
        return `ItemDescription: ${item.ItemDescription}\nQuantity: ${item.Quantity}`;
      });

      return `DocDate: ${docDate}\nDocTotal: ${
        order.DocTotal
      }\n\nDocumentLines:\n${docLines.join("\n\n")}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(orders.join("\n\n------------------\n\n"));
  }
);

purchaseMenuScene.hears(
  [messages.ordersOnWay.uz, messages.ordersOnWay.ru, messages.ordersOnWay.en],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getDeliveryNotes(employee.cardCode);

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
      await ctx.reply(messages.noOrdersFound[lang]);
      return;
    }

    const orders = result.data.map((order: any) => {
      const docDate = formatDate(order.DocDate, "YYYY-MM-DD HH:mm");

      const docLines = order.DocumentLines.map((item: any) => {
        return `ItemDescription: ${item.ItemDescription}\nQuantity: ${item.Quantity}`;
      });

      return `DocDate: ${docDate}\nDocTotal: ${
        order.DocTotal
      }\n\nDocumentLines:\n${docLines.join("\n\n")}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(orders.join("\n\n------------------\n\n"));
  }
);

purchaseMenuScene.hears(
  [
    messages.completedPurchases.uz,
    messages.completedPurchases.ru,
    messages.completedPurchases.en,
  ],
  async (ctx) => {
    await ctx.scene.enter("completedPurchases");
  }
);

purchaseMenuScene.hears(
  [messages.backButton.uz, messages.backButton.ru, messages.backButton.en],
  async (ctx) => {
    await ctx.scene.enter("mainMenu");
  }
);

export default purchaseMenuScene;
