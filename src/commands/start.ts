import { Context } from "telegraf";

const startCommand = async (ctx: Context) => {
  const user = ctx.from;

  const full_name = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();
  const user_mention = `<a href="tg://user?id=${user?.id}">${full_name}</a>`;

  await ctx.reply(`Hello there, ${user_mention}`);
};

export default startCommand;
