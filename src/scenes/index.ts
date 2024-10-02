import { Scenes } from "telegraf";
import Context from "../types/context";
import mainMenuScene from "./mainMenu";
import purchaseMenuScene from "./purchaseMenu";
import paymentMenuScene from "./paymentMenu";
import addPurchaseScene from "./addPurchase";
import addProductScene from "./addProduct";
import completedPurchasesScene from "./completedPurchases";

const stage = new Scenes.Stage<Context>([
  mainMenuScene,
  purchaseMenuScene,
  paymentMenuScene,
  addProductScene,
  addPurchaseScene,
  completedPurchasesScene,
]);

export default stage;
