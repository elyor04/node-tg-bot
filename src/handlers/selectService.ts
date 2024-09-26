import { Context } from "telegraf";

const purchasesHandler = async (ctx: Context) => {
  console.log(`ENTERED purchasesHandler()`);
};

const paymentsHandler = async (ctx: Context) => {
  console.log(`ENTERED paymentsHandler()`);
};

export { purchasesHandler, paymentsHandler };
