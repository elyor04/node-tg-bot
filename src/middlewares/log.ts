import { Context } from "telegraf";
import logger from "../utils/logger";

const logMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  if (ctx.chat?.type !== "private") return;

  const user = ctx.from;
  const user_id = user?.id;
  const full_name = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();
  const username = user?.username ? `"@${user.username}"` : null;

  const startTime = Date.now();

  await next()
    .then(() => {
      const spentTime = Date.now() - startTime;
      logger.info(
        `User id=${user_id}, name="${full_name}", username=${username}. Duration ${spentTime} ms`
      );
    })
    .catch((err) => {
      const spentTime = Date.now() - startTime;
      logger.error(`${err?.name} - ${err?.message}. Duration ${spentTime} ms`);
      console.error(err);
    });
};

export default logMiddleware;
