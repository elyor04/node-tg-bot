import { Telegraf, session } from "telegraf";
import Context from "../types/context";
import logMiddleware from "./log";
import userMiddleware from "./user";

const registerMiddlewares = (bot: Telegraf<Context>) => {
  bot.use(async (ctx, next) => {
    if (ctx.chat?.type !== "private") return;
    await next();
  });
  bot.use(session());
  bot.use(logMiddleware);
  bot.use(userMiddleware);
};

export default registerMiddlewares;
