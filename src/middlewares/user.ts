import Context from "../types/context";
import User from "../database/models/User";

const userMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  let user = await User.findOne({
    where: { id: ctx.from?.id },
  });

  if (!user)
    user = await User.create({
      id: ctx.from?.id,
    });

  ctx.user = user;

  await next();
};

export default userMiddleware;
