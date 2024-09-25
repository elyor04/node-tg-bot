import { Context, Markup } from "telegraf";
import User from "../database/models/User";
import messages from "../utils/messages";

const phoneCommand = async (ctx: Context) => {
  let user = await User.findOne({
    where: { id: ctx.from?.id },
  });

  if (!user)
    user = await User.create({
      id: ctx.from?.id,
    });

  const lang = user?.lang || "en";

  const keyboard = Markup.keyboard([
    [Markup.button.contactRequest(messages.shareNumber[lang])],
  ])
    .oneTime()
    .resize();

  await ctx.reply(messages.authorization[lang], keyboard);
};

export default phoneCommand;
