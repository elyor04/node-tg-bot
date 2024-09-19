import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./utils/config";
import startCommand from "./commands/start";
import logger from "./middlewares/logger";

const bot = new Telegraf(BOT_TOKEN);

// Middlewares
bot.use(logger);

// Commands
bot.start(startCommand);

export default bot;
