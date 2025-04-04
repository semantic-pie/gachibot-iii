import { Bot } from "@grammy";
import { BotContext } from "@src/context.ts";
import { middleware } from "@src/middleware.ts";
import { addMessagesToHistory } from "@src/utils/chatHistory.ts";
import { getStickerFromMessage } from "@src/utils/stickerExtractor.ts";
import { generateAnswer } from "./utils/generateAnswer.ts";

const bot = new Bot<BotContext>(Deno.env.get("BOT_TOKEN") || "");

bot.use(middleware);

bot.command("whoami", (ctx) => {
  ctx.reply(ctx.config.user?.profile ?? "Empty profile");
  ctx.reply(
    ctx.config.user?.history
      .map((i) => `[${i.role}] ${i.name}: ${i.content}`)
      .join("\n") ?? "Empty history"
  );
});

bot.on("message", async (ctx) => {
  await addMessagesToHistory(
    [
      {
        role: "user",
        userId: ctx.msg.from.id,
        content: ctx.msg.text ?? "",
        name: ctx.from?.first_name + " " + (ctx.from?.last_name ?? ""),
      },
    ],
    ctx.msg?.chat.id
  );

  if (ctx.config.shouldBreakIn >= 3 || ctx.config.isReplyMe) {
    ctx.replyWithChatAction("typing");
    
    const response = await generateAnswer(
      ctx.msg?.chat.id
    );

    if (!response) return;

    try {
      const command = JSON.parse(response);
      ctx.reply("Command: " + JSON.stringify(command));
    } catch {
      const { message, sticker } = getStickerFromMessage(response);

      try {
        sticker && ctx.replyWithSticker(sticker);
      }catch {}
      ctx.reply(message, {
        reply_parameters: { message_id: ctx.msg.message_id },
      });

      await addMessagesToHistory(
        [
          {
            role: "assistant",
            name: "Билли",
            content: response,
          },
        ],
        ctx.msg?.chat.id
      );
    }
  }
});

bot.on;

export default bot;
