import { Markup } from "telegraf";
import Context from "../types/context";
import messages from "../utils/messages";

const phoneCommand = async (ctx: Context) => {
  const lang = ctx.user?.lang || "en";

  const keyboard = Markup.keyboard([
    [Markup.button.contactRequest(messages.shareNumber[lang])],
  ])
    .oneTime()
    .resize();

  await ctx.reply(messages.authorization[lang], keyboard);
};

export default phoneCommand;
