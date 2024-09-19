import { Context } from "telegraf";

const echoHandler = async (ctx: Context) => {
  await ctx.reply(`You said: ${ctx.text}`);
};

export default echoHandler;
