import { Telegraf } from "telegraf";
import logMiddleware from "./log";

const registerMiddlewares = (bot: Telegraf) => {
  bot.use(logMiddleware);
};

export default registerMiddlewares;
