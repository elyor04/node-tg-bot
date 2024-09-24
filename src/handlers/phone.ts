import { Context, Markup } from "telegraf";
import { Message } from "telegraf/types";
import User from "../database/models/User";
import messages from "../utils/messages";

const phoneHandler = async (ctx: Context) => {
  const message = ctx.message as Message.ContactMessage;

  const user = (await User.findOne({
    where: { id: ctx.from?.id },
  })) as User;

  const lang = user?.lang || "uz";

  if (!user?.phone) {
    user.phone = message.contact.phone_number;
    await user.save();

    const keyboard = Markup.keyboard([
      [messages.purchases[lang], messages.payments[lang]],
    ])
      .oneTime()
      .resize();

    await ctx.reply(messages.selectService[lang], keyboard);

  } else {
    user.phone = message.contact.phone_number;
    await user.save();

    await ctx.reply(messages.phoneChanged[lang]);
  }
};

export default phoneHandler;
