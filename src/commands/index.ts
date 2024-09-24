import { Telegraf } from "telegraf";
import startCommand from "./start";
import langCommand from "./lang";
import phoneCommand from "./phone";

const registerCommands = (bot: Telegraf) => {
  bot.start(startCommand);
  bot.command("lang", langCommand);
  bot.command("phone", phoneCommand);
};

export default registerCommands;
