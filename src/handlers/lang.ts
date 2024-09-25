import { Context, Markup } from "telegraf";
import { Message } from "telegraf/types";
import User from "../database/models/User";
import messages from "../utils/messages";

const langHandler = async (ctx: Context) => {
  const message = ctx.message as Message.TextMessage;

  const user = (await User.findOne({
    where: { id: ctx.from?.id },
  })) as User;

  let lang: "uz" | "ru" | "en";

  if (message.text === "🇺🇿 O'zbek") lang = "uz";
  else if (message.text === "🇷🇺 Русский") lang = "ru";
  else lang = "en";

  if (!user?.lang) {
    user.lang = lang;
    await user.save();

    const keyboard = Markup.keyboard([
      [Markup.button.contactRequest(messages.shareNumber[lang])],
    ])
      .oneTime()
      .resize();

    await ctx.reply(messages.authorization[lang], keyboard);

  } else {
    user.lang = lang;
    await user.save();

    await ctx.reply(messages.languageChanged[lang]);
  }
};

export default langHandler;
