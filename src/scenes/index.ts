import { Telegraf, Scenes } from "telegraf";
import Context from "../types/context";
import mainMenuScene from "./mainMenu";
import purchaseMenuScene from "./purchaseMenu";
import paymentMenuScene from "./paymentMenu";
import addPurchaseScene from "./addPurchase";
import addProductScene from "./addProduct";
import messages from "../utils/messages";

const stage = new Scenes.Stage<Context>([
  mainMenuScene,
  purchaseMenuScene,
  paymentMenuScene,
  addProductScene,
  addPurchaseScene,
]);

stage.command("cancel", async (ctx) => {
  const lang = ctx.user?.lang || "en";

  await ctx.reply(messages.processCancelled[lang]);
  await ctx.scene.leave();
});

const registerScenes = (bot: Telegraf<Context>) => {
  bot.use(stage.middleware());
};

export default registerScenes;
