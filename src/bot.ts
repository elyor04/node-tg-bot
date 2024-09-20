import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./utils/config";
import registerMiddlewares from "./middlewares";
import registerCommands from "./commands";
import registerHandlers from "./handlers";

const bot = new Telegraf(BOT_TOKEN);

registerMiddlewares(bot);
registerCommands(bot);
registerHandlers(bot);

export default bot;
