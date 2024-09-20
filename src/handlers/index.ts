import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import echoHandler from "./echo";

const registerHandlers = (bot: Telegraf) => {
  bot.on(message("text"), echoHandler);
};

export default registerHandlers;
