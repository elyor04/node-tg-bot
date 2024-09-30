import Context from "../types/context";
import messages from "../utils/messages";

const cancelCommand = async (ctx: Context) => {
  const lang = ctx.user?.lang || "en";

  await ctx.reply(messages.processCancelled[lang], {
    reply_markup: {
      remove_keyboard: true,
    },
  });

  await ctx.scene.leave();
};

export default cancelCommand;
