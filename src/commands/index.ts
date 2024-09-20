import { Telegraf } from "telegraf";
import startCommand from "./start";

const registerCommands = (bot: Telegraf) => {
  bot.start(startCommand);
};

export default registerCommands;
