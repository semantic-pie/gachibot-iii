import { BotContext } from "@src/context.ts";
import { addMessagesToHistory } from "@src/utils/chatHistory.ts";
import { generateAnswer } from "@src/utils/generateAnswer.ts";
import { getStickerFromMessage } from "@src/utils/stickerExtractor.ts";

export const message = async (ctx: BotContext) => {
  if (!ctx.msg) return;

  await addMessagesToHistory(
    [
      {
        role: "user",
        userId: ctx.msg.from?.id,
        content: ctx.msg.text ?? "",
        name: ctx.from?.first_name + " " + (ctx.from?.last_name ?? ""),
      },
    ],
    ctx.msg?.chat.id
  );

  if (ctx.config.shouldBreakIn) {
    ctx.replyWithChatAction("typing");

    const response = await generateAnswer(ctx.msg?.chat.id);

    if (!response) return;

    try {
      const command = JSON.parse(response);
      ctx.reply("Command: " + JSON.stringify(command));
    } catch {
      const { message, sticker } = getStickerFromMessage(response);

      if (sticker) {
        await ctx.replyWithSticker(sticker).catch(e => console.log('Oh shit, here we gone againe: ', e));
      }

      await ctx.reply(message, {
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
        ctx.msg.chat.id
      );
    }
  }
};
