import { Bot } from "@grammy";
import { BotContext } from "@src/context.ts";
import { middleware } from "@src/middleware.ts";
import { generateAnswer } from "@src/utils/generateAnswer.ts";

const bot = new Bot<BotContext>(
  Deno.env.get("BOT_TOKEN") || "",
);

bot.use(middleware);

bot.on("message", async (ctx) => {

  if (ctx.config.shouldBreakIn >= 3) {
    ctx.replyWithChatAction("typing");
    const response = await generateAnswer(ctx.msg?.text, ctx.config.user);
    response && ctx.reply(response);
  }

  // ctx.reply(
  //   "Я не врываюсь. Просто тестовый ответ: " + JSON.stringify(ctx.config.user),
  // );
});

export default bot;
