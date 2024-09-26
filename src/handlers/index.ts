import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import langHandler from "./lang";
import phoneHandler from "./phone";
import { purchasesHandler, paymentsHandler } from "./selectService";

const registerHandlers = (bot: Telegraf) => {
  bot.hears(["🇺🇿 O'zbek", "🇷🇺 Русский", "🇬🇧 English"], langHandler);
  bot.on(message("contact"), phoneHandler);
  bot.action("selectService:purchases", purchasesHandler);
  bot.action("selectService:payments", paymentsHandler);
};

export default registerHandlers;
