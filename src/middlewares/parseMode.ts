import { Context } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";
import NextFunction from "../types/nextFunction";

const parseMode = (parse_mode: ParseMode) => {
  return async (ctx: Context, next: NextFunction) => {
    ctx.telegram.sendMessage = (chatId, text, options = {}) => {
      options.parse_mode = options.parse_mode || parse_mode; // Set default parse_mode

      return ctx.telegram.constructor.prototype.sendMessage.call(
        ctx.telegram,
        chatId,
        text,
        options
      );
    };
    await next();
  };
};

export default parseMode;
