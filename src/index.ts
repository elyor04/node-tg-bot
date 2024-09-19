import bot from "./bot";
import shutdown from "./utils/shutdown";
import logger from "./utils/logger";

// Start the bot
logger.info("Starting bot...");

bot.launch().catch((err) => {
  console.error(err);
});

// Graceful shutdown
process.once("SIGINT", () => shutdown(bot, "SIGINT"));
process.once("SIGTERM", () => shutdown(bot, "SIGTERM"));
