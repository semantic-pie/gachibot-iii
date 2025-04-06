import { BotContext } from "@src/context.ts";
import { processCommand } from "@src/processors/commandProcessor.ts";

import { generateAnswer } from "@src/utils/generateAnswer.ts";
import { getStickerFromMessage } from "@src/utils/stickerExtractor.ts";
import { extractCommand } from "@src/utils/extractCommand.ts";
import { afterMessageProcessor } from "@src/processors/afterMessageProcessor.ts";
import { beforeMessageProcessor } from "@src/processors/beforeMessageProcessor.ts";

export const handleMessage = async (ctx: BotContext) => {
  if (!ctx.msg) return;

  await beforeMessageProcessor({ ctx });

  if (ctx.config.botShouldReply) {
    ctx.replyWithChatAction("typing");

    let response = await generateAnswer(ctx.msg?.chat.id, undefined);

    if (!response) return;

    const { message, sticker } = getStickerFromMessage(response);

    const { commandJson, message: clearedMessage } = extractCommand(
      message,
    );

    if (clearedMessage && !commandJson) {
      await ctx.reply(clearedMessage, {
        reply_parameters: { message_id: ctx.msg.message_id },
      });
    }

    let commandOutput;

    if (commandJson) {
      commandOutput = await processCommand(commandJson, ctx);

      if (commandOutput) {
        response = await generateAnswer(
          ctx.msg?.chat.id,
          commandOutput,
          response,
        );

        await ctx.reply(
          extractCommand(getStickerFromMessage(response ?? "Я упал...").message)
            .message,
          {
            reply_parameters: { message_id: ctx.msg.message_id },
          },
        );
      } else {
        await ctx.reply(extractCommand(message).message, {
          reply_parameters: { message_id: ctx.msg.message_id },
        });
      }
    }
    if (sticker) {
      await ctx.replyWithSticker(sticker).catch((e) =>
        console.log("Oh shit, here we gone again: ", e)
      );
    }

    await afterMessageProcessor({ ctx, response });
  }
};
