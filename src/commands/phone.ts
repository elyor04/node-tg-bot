import { Markup } from "telegraf";
import Context from "../types/context";
import User from "../database/models/User";
import messages from "../utils/messages";

const phoneCommand = async (ctx: Context) => {
  if (!ctx.user)
    ctx.user = await User.create({
      id: ctx.from?.id,
    });

  const lang = ctx.user?.lang || "en";

  const keyboard = Markup.keyboard([
    [Markup.button.contactRequest(messages.shareNumber[lang])],
  ])
    .oneTime()
    .resize();

  await ctx.reply(messages.authorization[lang], keyboard);
};

export default phoneCommand;
