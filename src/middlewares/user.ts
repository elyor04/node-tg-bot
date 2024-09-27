import Context from "../types/context";
import User from "../database/models/User";

const userMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  ctx.user = await User.findOne({
    where: { id: ctx.from?.id },
  });

  await next();
};

export default userMiddleware;
