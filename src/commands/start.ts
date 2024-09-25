import { Context, Markup } from "telegraf";
import User from "../database/models/User";
import messages from "../utils/messages";
import verifyUser from "../services/verifyUser";
import logger from "../utils/logger";

const startCommand = async (ctx: Context) => {
  let user = await User.findOne({
    where: { id: ctx.from?.id },
  });

  if (!user)
    user = await User.create({
      id: ctx.from?.id,
    });

  const lang = user?.lang || "en";

  if (!user.lang) {
    const keyboard = Markup.keyboard([
      ["🇺🇿 O'zbek"],
      ["🇷🇺 Русский"],
      ["🇬🇧 English"],
    ])
      .oneTime()
      .resize();

    await ctx.reply(
      "Tilni tanlang\n\nВыберите язык\n\nSelect language",
      keyboard
    );

  } else if (!user.phone) {
    const keyboard = Markup.keyboard([
      [Markup.button.contactRequest(messages.shareNumber[lang])],
    ])
      .oneTime()
      .resize();

    await ctx.reply(messages.authorization[lang], keyboard);

  } else if (typeof user.employeeID !== "number") {
    const verifyResult = await verifyUser(user.phone);

    if (verifyResult?.error) {
      logger.error(verifyResult.error);
      await ctx.reply(verifyResult.error);
      return;
    }

    if (!verifyResult?.data) {
      await ctx.reply(messages.verifyError[lang]);
      return;
    }

    user.employeeID = verifyResult.data.employeeID;
    user.jobTitle = verifyResult.data.jobTitle;
    user.employeeName = verifyResult.data.employeeName;

    await user.save();
    await ctx.reply(messages.verifySuccess[lang]);

  } else {
    const keyboard = Markup.keyboard([
      [messages.purchases[lang], messages.payments[lang]],
    ])
      .oneTime()
      .resize();

    await ctx.reply(messages.selectService[lang], keyboard);
  }
};

export default startCommand;
