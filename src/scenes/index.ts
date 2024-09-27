import { Telegraf, Scenes } from "telegraf";
import Context from "../types/context";
import mainMenuScene from "./mainMenu";
import purchaseMenuScene from "./purchaseMenu";
import paymentMenuScene from "./paymentMenu";

const registerScenes = (bot: Telegraf<Context>) => {
  const stage = new Scenes.Stage([
    mainMenuScene,
    purchaseMenuScene,
    paymentMenuScene,
  ]);
  bot.use(stage.middleware());
};

export default registerScenes;
