import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./utils/config";
import logMiddleware from "./middlewares/logMiddleware";
import parseMode from "./middlewares/parseMode";
import startCommand from "./commands/start";
import echoHandler from "./handlers/echo";

const bot = new Telegraf(BOT_TOKEN);

// Middlewares
bot.use(logMiddleware);
bot.use(parseMode("HTML"));

// Commands
bot.start(startCommand);

// Handlers
bot.on("text", echoHandler);

export default bot;
