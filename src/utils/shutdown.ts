import { Telegraf } from "telegraf";
import Context from "../types/context";
import logger from "./logger";

const shutdown = (bot: Telegraf<Context>, signal: string) => {
  logger.info("Shutting down...");
  bot.stop(signal);
};

export default shutdown;
