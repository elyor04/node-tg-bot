import bot from "./bot";
import shutdown from "./utils/shutdown";

// Start the bot
console.log("Starting bot...");

bot.launch().catch((err) => {
  console.error(err);
});

// Graceful shutdown
process.once("SIGINT", () => shutdown(bot, "SIGINT"));
process.once("SIGTERM", () => shutdown(bot, "SIGTERM"));
