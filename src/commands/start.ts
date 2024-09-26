import { Context, Markup } from "telegraf";
import User from "../database/models/User";
import Employee from "../database/models/Employee";
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

  const employee = await Employee.findOne({
    where: { userId: user.id },
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

  } else if (!employee) {
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

    await Employee.create({
      id: verifyResult.data.employeeID,
      jobTitle: verifyResult.data.jobTitle,
      name: verifyResult.data.employeeName,
      userId: user.id,
    });

    await ctx.reply(messages.verifySuccess[lang]);

  } else {
    const keyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback(
          messages.purchases[lang],
          "selectService:purchases"
        ),
      ],
      [
        Markup.button.callback(
          messages.payments[lang],
          "selectService:payments"
        ),
      ],
    ]);

    await ctx.reply(messages.selectService[lang], keyboard);
  }
};

export default startCommand;
