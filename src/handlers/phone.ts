import { Message } from "telegraf/types";
import Context from "../types/context";
import Employee from "../database/models/Employee";
import messages from "../utils/messages";
import getEmployeeInfo from "../services/getEmployeeInfo";
import logger from "../utils/logger";

const phoneHandler = async (ctx: Context) => {
  const message = ctx.message as Message.ContactMessage;

  const employee = await Employee.findOne({
    where: { userId: ctx.user.id },
  });

  const lang = ctx.user?.lang || "en";
  const phoneExisted = !!ctx.user.phone;

  const phone = "+" + message.contact.phone_number.replace("+", "");
  ctx.user.phone = phone;
  await ctx.user.save();

  if (phoneExisted) await ctx.reply(messages.phoneChanged[lang]);
  const messageId = (await ctx.reply("⏳")).message_id;
  const result = await getEmployeeInfo(ctx.user.phone);

  if (result?.error) {
    logger.error(result.error);
    await ctx.deleteMessage(messageId);
    await ctx.reply(result.error);
    return;
  }

  if (!result?.data) {
    if (employee) {
      await employee.destroy();
    }
    await ctx.deleteMessage(messageId);
    await ctx.reply(messages.verifyError[lang]);
    return;
  }

  if (employee) {
    employee.id = result.data.employeeID;
    employee.jobTitle = result.data.jobTitle;
    employee.name = result.data.employeeName;
    employee.cardCode = result.data.cardCode;
    await employee.save();

  } else {
    await Employee.create({
      id: result.data.employeeID,
      jobTitle: result.data.jobTitle,
      name: result.data.employeeName,
      cardCode: result.data.cardCode,
      userId: ctx.user.id,
    });
  }

  await ctx.deleteMessage(messageId);
  await ctx.reply(messages.verifySuccess[lang]);
};

export default phoneHandler;
