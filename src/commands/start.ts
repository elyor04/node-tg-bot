import { Context } from "telegraf";

const startCommand = async (ctx: Context) => {
  await ctx.reply("Welcome! This is the start command.");
};

export default startCommand;
