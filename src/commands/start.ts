import { Context, Markup } from "telegraf";
import User from "../database/models/User";
import messages from "../utils/messages";

const startCommand = async (ctx: Context) => {
  let user = await User.findOne({
    where: { id: ctx.from?.id },
  });

  if (!user)
    user = await User.create({
      id: ctx.from?.id,
    });

  const lang = user?.lang || "uz";

  if (!user?.lang) {
    const keyboard = Markup.keyboard([["🇺🇿 O'zbek", "🇷🇺 Русский"]])
      .oneTime()
      .resize();

    await ctx.reply("Tilni tanlang | Выберите язык", keyboard);

  } else if (!user?.phone) {
    const keyboard = Markup.keyboard([
      [Markup.button.contactRequest(messages.shareNumber[lang])],
    ])
      .oneTime()
      .resize();

    await ctx.reply(messages.authorization[lang], keyboard);

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
