import { Context } from "telegraf";
import NextFunction from "../types/nextFunction";
import logger from "../utils/logger";

const logging = async (ctx: Context, next: NextFunction) => {
  logger.info(
    `Received (update_type=${ctx.updateType}, user_id=${ctx.from?.id})`
  );
  await next(); // Move to the next middleware or handler
};

export default logging;
