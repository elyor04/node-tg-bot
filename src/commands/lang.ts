import { Context, Markup } from "telegraf";
import User from "../database/models/User";

const langCommand = async (ctx: Context) => {
  const user = await User.findOne({
    where: { id: ctx.from?.id },
  });

  if (!user)
    await User.create({
      id: ctx.from?.id,
    });

  const keyboard = Markup.keyboard([["🇺🇿 O'zbek", "🇷🇺 Русский"]])
    .oneTime()
    .resize();

  await ctx.reply("Tilni tanlang | Выберите язык", keyboard);
};

export default langCommand;
