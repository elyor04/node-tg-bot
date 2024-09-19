import { Context } from "telegraf";
import NextFunction from "../types/nextFunction";

const logger = async (ctx: Context, next: NextFunction) => {
  console.log(`Received update: ${ctx.updateType}`);
  await next(); // Move to the next middleware or handler
};

export default logger;
