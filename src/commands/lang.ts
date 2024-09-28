import { Markup } from "telegraf";
import Context from "../types/context";

const langCommand = async (ctx: Context) => {
  const keyboard = Markup.keyboard([
    ["🇺🇿 O'zbek", "🇷🇺 Русский"],
    ["🇬🇧 English"],
  ])
    .oneTime()
    .resize();

  await ctx.reply("Tilni tanlang\n\nВыберите язык\n\nSelect language", keyboard);
};

export default langCommand;
