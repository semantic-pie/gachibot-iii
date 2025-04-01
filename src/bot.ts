import { Bot } from "@grammy";
import { BotContext } from "@src/context.ts";
import { middleware } from "@src/middleware.ts";

const bot = new Bot<BotContext>(
  "7254098541:AAF0l0Lz50w4QpIzZOtfNZhy1mtL-0QrYOM",
);

bot.use(middleware);

bot.on("message", (ctx) => {
  if (ctx.config.shouldBreakIn) {
    ctx.reply("AAA Я вижу я тут нужен?! Я врываюс в разговор!");
  }

  ctx.reply(
    "Я не врываюсь. Просто тестовый ответ: " + JSON.stringify(ctx.config.user),
  );
});

export default bot;
