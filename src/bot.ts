import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./utils/config";
import Context from "./types/context";
import registerMiddlewares from "./middlewares";
import registerCommands from "./commands";
import registerHandlers from "./handlers";
import registerScenes from "./scenes";

const bot = new Telegraf<Context>(BOT_TOKEN);

registerMiddlewares(bot);
registerScenes(bot);
registerCommands(bot);
registerHandlers(bot);

export default bot;
