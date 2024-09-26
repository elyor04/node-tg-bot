import { Context, Markup } from "telegraf";
import User from "../database/models/User";
import messages from "../utils/messages";

const purchasesHandler = async (ctx: Context) => {
  const user = (await User.findOne({
    where: { id: ctx.from?.id },
  })) as User;

  const lang = user?.lang || "en";

  const keyboard = Markup.inlineKeyboard([
    [
      Markup.button.callback(
        messages.addPurchase[lang],
        "purchases:addPurchase"
      ),
    ],
    [
      Markup.button.callback(
        messages.ordersInProgress[lang],
        "purchases:ordersInProgress"
      ),
    ],
    [
      Markup.button.callback(
        messages.confirmedOrders[lang],
        "purchases:confirmedOrders"
      ),
    ],
    [
      Markup.button.callback(
        messages.ordersOnWay[lang],
        "purchases:ordersOnWay"
      ),
    ],
    [
      Markup.button.callback(
        messages.completedPurchases[lang],
        "purchases:completedPurchases"
      ),
    ],
  ]);

  await ctx.reply(messages.purchaseService[lang], keyboard);
};

const paymentsHandler = async (ctx: Context) => {
  const user = (await User.findOne({
    where: { id: ctx.from?.id },
  })) as User;

  const lang = user?.lang || "en";

  const keyboard = Markup.inlineKeyboard([
    [
      Markup.button.callback(
        messages.inDebt[lang],
        "payments:inDebt"
      )
    ],
    [
      Markup.button.callback(
        messages.addOutgoingPayment[lang],
        "payments:addOutgoingPayment"
      ),
    ],
    [
      Markup.button.callback(
        messages.reviseAct[lang],
        "payments:reviseAct"
      )
    ],
  ]);

  await ctx.reply(messages.paymentService[lang], keyboard);
};

export { purchasesHandler, paymentsHandler };
