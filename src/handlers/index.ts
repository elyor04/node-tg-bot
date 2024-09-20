import { Telegraf } from "telegraf";
import echoHandler from "./echo";

const registerHandlers = (bot: Telegraf) => {
  bot.on("text", echoHandler);
};

export default registerHandlers;
