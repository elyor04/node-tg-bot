import { Scenes } from "telegraf";
import Context from "../types/context";
import mainMenuScene from "./mainMenu";
import purchaseMenuScene from "./purchaseMenu";
import paymentMenuScene from "./paymentMenu";
import addPurchaseScene from "./addPurchase";
import addProductScene from "./addProduct";

const stage = new Scenes.Stage<Context>([
  mainMenuScene,
  purchaseMenuScene,
  paymentMenuScene,
  addProductScene,
  addPurchaseScene,
]);

export default stage;
