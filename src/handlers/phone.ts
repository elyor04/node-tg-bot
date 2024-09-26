import { Context } from "telegraf";
import { Message } from "telegraf/types";
import User from "../database/models/User";
import Employee from "../database/models/Employee";
import messages from "../utils/messages";
import verifyUser from "../services/verifyUser";
import logger from "../utils/logger";

const phoneHandler = async (ctx: Context) => {
  const message = ctx.message as Message.ContactMessage;

  const user = (await User.findOne({
    where: { id: ctx.from?.id },
  })) as User;

  const employee = await Employee.findOne({
    where: { userId: user.id },
  });

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
    if (employee) {
      await employee.destroy();
    }
    await ctx.reply(messages.verifyError[lang]);
    return;
  }

  if (employee) {
    employee.id = verifyResult.data.employeeID;
    employee.jobTitle = verifyResult.data.jobTitle;
    employee.name = verifyResult.data.employeeName;
    await employee.save();

  } else {
    await Employee.create({
      id: verifyResult.data.employeeID,
      jobTitle: verifyResult.data.jobTitle,
      name: verifyResult.data.employeeName,
      userId: user.id,
    });
  }

  await ctx.reply(messages.verifySuccess[lang]);
};

export default phoneHandler;
