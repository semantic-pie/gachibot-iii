import { BotContext } from "@src/context.ts";
import {
  extractCommand,
  processCommand,
} from "@src/processors/commandProcessor.ts";
import { updateProfile } from "@src/utils/botProfile.ts";
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
    ctx.msg?.chat.id,
  );

  if (ctx.config.shouldBreakIn) {
    ctx.replyWithChatAction("typing");

    const response = await generateAnswer(ctx.msg?.chat.id);

    if (!response) return;

    const { message, sticker } = getStickerFromMessage(response);

    const { commandJson, message: clearedMessage } = extractCommand(
      message,
    );

    if (clearedMessage) {
      await ctx.reply(clearedMessage, {
        reply_parameters: { message_id: ctx.msg.message_id },
      });
    }

    if (commandJson) {
      await processCommand(commandJson, ctx);
    }
    if (sticker) {
      await ctx.replyWithSticker(sticker).catch((e) =>
        console.log("Oh shit, here we gone again: ", e)
      );
    }

    const history = await addMessagesToHistory(
      [
        {
          role: "assistant",
          name: "Билли",
          content: response,
        },
      ],
      ctx.msg.chat.id,
    );

    await updateProfile(history);
  }
};
