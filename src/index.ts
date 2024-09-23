import bot from "./bot";
import shutdown from "./utils/shutdown";
import logger from "./utils/logger";
import loginToSAP from "./services/login";

// Start the bot
logger.info("Starting bot...");
bot.launch().catch((err) => {
  logger.error(`${err?.name} - ${err?.message}`);
});

// Try logging into SAP
loginToSAP().then((result) => {
  if (result?.error) logger.warn(result.error);
  else logger.info("Logged into SAP");
});

// Graceful shutdown
process.once("SIGINT", () => shutdown(bot, "SIGINT"));
process.once("SIGTERM", () => shutdown(bot, "SIGTERM"));
