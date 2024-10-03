import Context from "../types/context";
import logger from "../utils/logger";

const logMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  const startTime = Date.now();

  await next()
    .then(() => {
      const spentTime = Date.now() - startTime;
      logger.info(`User id=${ctx.from?.id}. Duration ${spentTime} ms`);
    })
    .catch((err) => {
      const spentTime = Date.now() - startTime;
      logger.error(`${err?.name} - ${err?.message}. Duration ${spentTime} ms`);
      console.error(err);
    });
};

export default logMiddleware;
