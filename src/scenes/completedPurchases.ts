import { Scenes, Markup } from "telegraf";
import Context from "../types/context";

const completedPurchasesScene = new Scenes.BaseScene<Context>(
  "completedPurchases"
);

export default completedPurchasesScene;
