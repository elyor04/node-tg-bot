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
        "payments:ordersInProgress"
      ),
    ],
    [
      Markup.button.callback(
        messages.confirmedOrders[lang],
        "payments:confirmedOrders"
      ),
    ],
    [
      Markup.button.callback(
        messages.ordersOnWay[lang],
        "payments:ordersOnWay"
      ),
    ],
    [
      Markup.button.callback(
        messages.completedPurchases[lang],
        "payments:completedPurchases"
      ),
    ],
  ]);

  await ctx.reply(messages.purchasesService[lang], keyboard);
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
        "purchases:inDebt"
      )
    ],
    [
      Markup.button.callback(
        messages.addOutgoingPayments[lang],
        "payments:addOutgoingPayments"
      ),
    ],
    [
      Markup.button.callback(
        messages.reviseAct[lang],
        "payments:reviseAct"
      )
    ],
  ]);

  await ctx.reply(messages.paymentsService[lang], keyboard);
};

export { purchasesHandler, paymentsHandler };
