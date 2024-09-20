import { Telegraf } from "telegraf";
import logging from "./logging";
import parseMode from "./parseMode";

const registerMiddlewares = (bot: Telegraf) => {
  bot.use(logging);
  bot.use(parseMode("HTML"));
};

export default registerMiddlewares;
