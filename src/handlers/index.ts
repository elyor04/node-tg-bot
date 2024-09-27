import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import Context from "../types/context";
import langHandler from "./lang";
import phoneHandler from "./phone";

const registerHandlers = (bot: Telegraf<Context>) => {
  bot.hears(["🇺🇿 O'zbek", "🇷🇺 Русский", "🇬🇧 English"], langHandler);
  bot.on(message("contact"), phoneHandler);
};

export default registerHandlers;
