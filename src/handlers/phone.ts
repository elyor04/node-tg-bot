import { Message } from "telegraf/types";
import Context from "../types/context";
import Employee from "../database/models/Employee";
import messages from "../utils/messages";
import verifyUser from "../services/verifyUser";
import logger from "../utils/logger";

const phoneHandler = async (ctx: Context) => {
  const message = ctx.message as Message.ContactMessage;

  const employee = await Employee.findOne({
    where: { userId: ctx.user.id },
  });

  const lang = ctx.user?.lang || "en";
  const phoneExisted = !!ctx.user.phone;

  ctx.user.phone = message.contact.phone_number;
  await ctx.user.save();

  if (phoneExisted) await ctx.reply(messages.phoneChanged[lang]);
  const verifyResult = await verifyUser(ctx.user.phone);

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
      userId: ctx.user.id,
    });
  }

  await ctx.reply(messages.verifySuccess[lang]);
};

export default phoneHandler;
