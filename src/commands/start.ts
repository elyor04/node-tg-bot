import { Markup } from "telegraf";
import Context from "../types/context";
import User from "../database/models/User";
import Employee from "../database/models/Employee";
import messages from "../utils/messages";
import verifyUser from "../services/verifyUser";
import logger from "../utils/logger";

const startCommand = async (ctx: Context) => {
  if (!ctx.user)
    ctx.user = await User.create({
      id: ctx.from?.id,
    });

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
    const verifyResult = await verifyUser(ctx.user.phone);

    if (verifyResult?.error) {
      logger.error(verifyResult.error);
      await ctx.reply(verifyResult.error);
      return;
    }

    if (!verifyResult?.data) {
      await ctx.reply(messages.verifyError[lang]);
      return;
    }

    await Employee.create({
      id: verifyResult.data.employeeID,
      jobTitle: verifyResult.data.jobTitle,
      name: verifyResult.data.employeeName,
      userId: ctx.user.id,
    });

    await ctx.reply(messages.verifySuccess[lang]);

  } else {
    await ctx.scene.enter("mainMenu");
  }
};

export default startCommand;
