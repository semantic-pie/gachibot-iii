import { Bot } from "@grammy";
import { BotContext } from "@src/context.ts";
import { middleware } from "@src/middleware.ts";
import { generateAnswer } from "@src/utils/generateAnswer.ts";

const bot = new Bot<BotContext>(
  Deno.env.get("BOT_TOKEN") || "",
);

bot.use(middleware);

bot.on("message", async (ctx) => {
  if (ctx.config.shouldBreakIn >= 3 || ctx.config.isReplyMe) {
    ctx.replyWithChatAction("typing");
    const response = await generateAnswer(ctx.msg?.text, ctx.config.user);

    if (!response) return;

    try {
      const command = JSON.parse(response);
      ctx.reply("Command: " + JSON.stringify(command));
    } catch {
      ctx.reply(
        response,
        {
          reply_parameters: { message_id: ctx.msg.message_id },
        },
      );
    }
  }
});

bot.on;

export default bot;
