import { Markup } from "telegraf";
import Context from "../types/context";
import User from "../database/models/User";

const langCommand = async (ctx: Context) => {
  if (!ctx.user)
    await User.create({
      id: ctx.from?.id,
    });

  const keyboard = Markup.keyboard([
    ["🇺🇿 O'zbek", "🇷🇺 Русский"],
    ["🇬🇧 English"],
  ])
    .oneTime()
    .resize();

  await ctx.reply("Tilni tanlang\n\nВыберите язык\n\nSelect language", keyboard);
};

export default langCommand;
