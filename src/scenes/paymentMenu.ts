import { Scenes, Markup } from "telegraf";
import Context from "../types/context";
import messages from "../utils/messages";
import getBusinessPartner from "../services/getBusinessPartner";
import Employee from "../database/models/Employee";
import logger from "../utils/logger";

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
  async (ctx) => {
    const employee = (await Employee.findOne({
      where: { userId: ctx.user.id },
    })) as Employee;

    const lang = ctx.user?.lang || "en";

    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getBusinessPartner(employee.cardCode);

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

    const balance = result.data?.currentAccountBalance as number;

    await ctx.deleteMessage(messageId);
    await ctx.reply(messages.yourAccountBalance[lang](balance));
  }
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
  async (ctx) => {
    await ctx.scene.enter("reviseAct");
  }
);

paymentMenuScene.hears(
  [messages.backButton.uz, messages.backButton.ru, messages.backButton.en],
  async (ctx) => {
    await ctx.scene.enter("mainMenu");
  }
);

export default paymentMenuScene;
