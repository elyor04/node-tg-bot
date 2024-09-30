import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./utils/config";
import Context from "./types/context";
import registerMiddlewares from "./middlewares";
import registerCommands from "./commands";
import registerHandlers from "./handlers";
import stage from "./scenes";

const bot = new Telegraf<Context>(BOT_TOKEN);

registerMiddlewares(bot);
registerCommands(stage);
registerHandlers(stage);
bot.use(stage.middleware());

export default bot;
