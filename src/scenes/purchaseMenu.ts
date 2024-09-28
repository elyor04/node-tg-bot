import { Scenes, Markup } from "telegraf";
import Context from "../types/context";
import messages from "../utils/messages";

const purchaseMenuScene = new Scenes.BaseScene<Context>("purchaseMenu");

purchaseMenuScene.enter(async (ctx) => {
  const lang = ctx.user?.lang || "en";

  const keyboard = Markup.keyboard([
    [messages.addPurchase[lang], messages.ordersInProgress[lang]],
    [messages.confirmedOrders[lang], messages.ordersOnWay[lang]],
    [messages.completedPurchases[lang], messages.backButton[lang]],
  ])
    .oneTime()
    .resize();

  await ctx.reply(messages.purchaseMenu[lang], keyboard);
});

purchaseMenuScene.hears(
  [messages.addPurchase.uz, messages.addPurchase.ru, messages.addPurchase.en],
  async (ctx) => {
    await ctx.scene.enter("addProduct");
  }
);

purchaseMenuScene.hears(
  [
    messages.ordersInProgress.uz,
    messages.ordersInProgress.ru,
    messages.ordersInProgress.en,
  ],
  async (ctx) => {}
);

purchaseMenuScene.hears(
  [
    messages.confirmedOrders.uz,
    messages.confirmedOrders.ru,
    messages.confirmedOrders.en,
  ],
  async (ctx) => {}
);

purchaseMenuScene.hears(
  [messages.ordersOnWay.uz, messages.ordersOnWay.ru, messages.ordersOnWay.en],
  async (ctx) => {}
);

purchaseMenuScene.hears(
  [
    messages.completedPurchases.uz,
    messages.completedPurchases.ru,
    messages.completedPurchases.en,
  ],
  async (ctx) => {}
);

purchaseMenuScene.hears(
  [messages.backButton.uz, messages.backButton.ru, messages.backButton.en],
  async (ctx) => {
    await ctx.scene.enter("mainMenu");
  }
);

export default purchaseMenuScene;
