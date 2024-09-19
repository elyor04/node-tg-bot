import { Telegram, Context } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";
import NextFunction from "../types/nextFunction";

const parseMode = (parse_mode: ParseMode) => {
  return async (ctx: Context, next: NextFunction) => {
    ctx.telegram.sendMessage = (chatId, text, extra = {}) => {
      extra.parse_mode = extra.parse_mode || parse_mode; // Set default parse_mode

      return Telegram.prototype.sendMessage.call(
        ctx.telegram,
        chatId,
        text,
        extra
      );
    };
    await next();
  };
};

export default parseMode;
