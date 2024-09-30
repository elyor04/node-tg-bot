import { Markup } from "telegraf";
import { Message } from "telegraf/types";
import Context from "../types/context";
import messages from "../utils/messages";

const langHandler = async (ctx: Context) => {
  const message = ctx.message as Message.TextMessage;

  let lang: "uz" | "ru" | "en";

  if (message.text === "🇺🇿 O'zbek") lang = "uz";
  else if (message.text === "🇷🇺 Русский") lang = "ru";
  else lang = "en";

  if (!ctx.user?.lang) {
    ctx.user.lang = lang;
    await ctx.user.save();

    const keyboard = Markup.keyboard([
      [Markup.button.contactRequest(messages.shareNumber[lang])],
    ])
      .oneTime()
      .resize();

    await ctx.reply(messages.authorization[lang], keyboard);

  } else {
    ctx.user.lang = lang;
    await ctx.user.save();

    await ctx.reply(messages.languageChanged[lang]);
  }
};

export default langHandler;
