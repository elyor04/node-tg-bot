import { Telegraf } from "telegraf";
import logging from "./logging";

const registerMiddlewares = (bot: Telegraf) => {
  bot.use(logging);
};

export default registerMiddlewares;
