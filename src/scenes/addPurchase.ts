import { Scenes } from "telegraf";
import Context from "../types/context";

const addPurchaseScene = new Scenes.WizardScene<Context>(
  "addPurchase",
  async (ctx) => {}
);

export default addPurchaseScene;
