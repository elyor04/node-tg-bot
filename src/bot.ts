import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./utils/config";
import logger from "./middlewares/logger";
import startCommand from "./commands/start";
import echoHandler from "./handlers/echo";

const bot = new Telegraf(BOT_TOKEN);

// Middlewares
bot.use(logger);

// Commands
bot.start(startCommand);

// Handlers
bot.on("text", echoHandler);

export default bot;
