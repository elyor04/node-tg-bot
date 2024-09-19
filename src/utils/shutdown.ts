import { Telegraf } from "telegraf";
import logger from "./logger";

const shutdown = (bot: Telegraf, signal: string) => {
  logger.info("Shutting down...");
  bot.stop(signal);
};

export default shutdown;
