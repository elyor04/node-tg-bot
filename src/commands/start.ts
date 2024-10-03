import { Markup } from "telegraf";
import Context from "../types/context";
import Employee from "../database/models/Employee";
import messages from "../utils/messages";
import getEmployeeInfo from "../services/getEmployeeInfo";
import logger from "../utils/logger";

const startCommand = async (ctx: Context) => {
  const employee = await Employee.findOne({
    where: { userId: ctx.user.id },
  });

  const lang = ctx.user?.lang || "en";

  if (!ctx.user.lang) {
    const keyboard = Markup.keyboard([
      ["🇺🇿 O'zbek", "🇷🇺 Русский"],
      ["🇬🇧 English"],
    ])
      .oneTime()
      .resize();

    await ctx.reply(
      "Tilni tanlang\n\nВыберите язык\n\nSelect language",
      keyboard
    );

  } else if (!ctx.user.phone) {
    const keyboard = Markup.keyboard([
      [Markup.button.contactRequest(messages.shareNumber[lang])],
    ])
      .oneTime()
      .resize();

    await ctx.reply(messages.authorization[lang], keyboard);

  } else if (!employee) {
    const messageId = (await ctx.reply("⏳")).message_id;
    const result = await getEmployeeInfo(ctx.user.phone);

    if (result?.error) {
      logger.error(result.error);
      await ctx.deleteMessage(messageId);
      await ctx.reply(result.error);
      return;
    }

    if (!result?.data) {
      await ctx.deleteMessage(messageId);
      await ctx.reply(messages.verifyError[lang]);
      return;
    }

    await Employee.create({
      id: result.data.employeeID,
      jobTitle: result.data.jobTitle,
      name: result.data.employeeName,
      cardCode: result.data.cardCode,
      userId: ctx.user.id,
    });

    await ctx.deleteMessage(messageId);
    await ctx.reply(messages.verifySuccess[lang]);

  } else {
    await ctx.scene.enter("mainMenu");
  }
};

export default startCommand;
