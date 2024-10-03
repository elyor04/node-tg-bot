import { Scenes, Markup } from "telegraf";
import Context from "../types/context";
import messages from "../utils/messages";
import getIncomingPayments from "../services/getIncomingPayments";
import logger from "../utils/logger";
import Employee from "../database/models/Employee";

const reviseActScene = new Scenes.BaseScene<Context>("reviseAct");

reviseActScene.enter(async (ctx) => {
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

reviseActScene.hears(
  [messages.oneDay.uz, messages.oneDay.ru, messages.oneDay.en],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getIncomingPayments({ days: 1 }, employee.cardCode);

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
      await ctx.reply(messages.noReviseActsFound[lang]);
      return;
    }

    const reviseActs = result.data.map((reviseAct) => {
      return `CardCode: ${reviseAct.cardCode}\nDocStatus: ${reviseAct.docStatus}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(reviseActs.join("\n\n"));
  }
);

reviseActScene.hears(
  [messages.oneWeek.uz, messages.oneWeek.ru, messages.oneWeek.en],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getIncomingPayments({ weeks: 1 }, employee.cardCode);

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
      await ctx.reply(messages.noReviseActsFound[lang]);
      return;
    }

    const reviseActs = result.data.map((reviseAct) => {
      return `CardCode: ${reviseAct.cardCode}\nDocStatus: ${reviseAct.docStatus}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(reviseActs.join("\n\n"));
  }
);

reviseActScene.hears(
  [messages.oneMonth.uz, messages.oneMonth.ru, messages.oneMonth.en],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getIncomingPayments({ months: 1 }, employee.cardCode);

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
      await ctx.reply(messages.noReviseActsFound[lang]);
      return;
    }

    const reviseActs = result.data.map((reviseAct) => {
      return `CardCode: ${reviseAct.cardCode}\nDocStatus: ${reviseAct.docStatus}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(reviseActs.join("\n\n"));
  }
);

reviseActScene.hears(
  [messages.allTime.uz, messages.allTime.ru, messages.allTime.en],
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getIncomingPayments({}, employee.cardCode);

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
      await ctx.reply(messages.noReviseActsFound[lang]);
      return;
    }

    const reviseActs = result.data.map((reviseAct) => {
      return `CardCode: ${reviseAct.cardCode}\nDocStatus: ${reviseAct.docStatus}`;
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(reviseActs.join("\n\n"));
  }
);

reviseActScene.hears(
  [messages.backButton.uz, messages.backButton.ru, messages.backButton.en],
  async (ctx) => {
    await ctx.scene.enter("paymentMenu");
  }
);

export default reviseActScene;
