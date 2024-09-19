import { Telegraf } from "telegraf";

const shutdown = (bot: Telegraf, signal: string) => {
  console.log("Shutting down...");
  bot.stop(signal);
};

export default shutdown;
