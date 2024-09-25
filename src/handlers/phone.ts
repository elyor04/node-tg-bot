import { Context, Markup } from "telegraf";
import { Message } from "telegraf/types";
import User from "../database/models/User";
import messages from "../utils/messages";
import verifyUser from "../services/verifyUser";
import logger from "../utils/logger";

const phoneHandler = async (ctx: Context) => {
  const message = ctx.message as Message.ContactMessage;

  const user = (await User.findOne({
    where: { id: ctx.from?.id },
  })) as User;

  const lang = user?.lang || "en";
  const phoneExisted = !!user.phone;

  user.phone = message.contact.phone_number;
  await user.save();

  if (phoneExisted) await ctx.reply(messages.phoneChanged[lang]);
  const verifyResult = await verifyUser(user.phone);

  if (verifyResult?.error) {
    logger.error(verifyResult.error);
    await ctx.reply(verifyResult.error);
    return;
  }

  if (!verifyResult?.data) {
    if (phoneExisted) {
      user.employeeID = null;
      user.jobTitle = null;
      user.employeeName = null;

      await user.save();
    }

    await ctx.reply(messages.verifyError[lang]);
    return;
  }

  user.employeeID = verifyResult.data.employeeID;
  user.jobTitle = verifyResult.data.jobTitle;
  user.employeeName = verifyResult.data.employeeName;

  await user.save();
  await ctx.reply(messages.verifySuccess[lang]);
};

export default phoneHandler;
