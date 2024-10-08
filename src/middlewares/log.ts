import Context from "../types/context";
import logger from "../utils/logger";

const logMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  const startTime = Date.now();

  await next()
    .then(async () => {
      const spentTime = Date.now() - startTime;
      logger.info(`User id=${ctx.from?.id}. Duration ${spentTime} ms`);
    })
    .catch(async (err) => {
      const spentTime = Date.now() - startTime;
      const errorMessage = `${err?.name} - ${err?.message}`;

      logger.error(`${errorMessage}. Duration ${spentTime} ms`);
      ctx.reply(errorMessage, {
        reply_markup: {
          remove_keyboard: true,
        },
      });

      await ctx.scene.leave();
      console.error(err);
    });
};

export default logMiddleware;
