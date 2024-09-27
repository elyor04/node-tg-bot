import { Telegraf } from "telegraf";
import Context from "../types/context";
import startCommand from "./start";
import langCommand from "./lang";
import phoneCommand from "./phone";

const registerCommands = (bot: Telegraf<Context>) => {
  bot.start(startCommand);
  bot.command("lang", langCommand);
  bot.command("phone", phoneCommand);
};

export default registerCommands;
