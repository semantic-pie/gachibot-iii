import { addMessagesToHistory } from "@src/utils/chatHistory.ts";
import { BotContext } from "@src/context.ts";

export const processHistoryUpdate = async (
  ctx: BotContext,
  botResponse?: string,
) => {
  if (!ctx?.msg || !ctx.msg.from || !ctx.msg.text) return;

  const isBot = ctx.msg.from.id === ctx.me.id;

  const history = await addMessagesToHistory(
    [
      {
        role: botResponse ? "assistant" : "user",
        content: botResponse ? botResponse : ctx.msg.text,
        userId: isBot ? undefined : ctx.msg.from.id,
        name: isBot
          ? ctx.msg.from.first_name + " " + (ctx.msg.from.last_name ?? "")
          : "Билли",
      },
    ],
    ctx.msg.chat.id,
  );

  return history;
};
