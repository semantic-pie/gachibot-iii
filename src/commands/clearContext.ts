import { db } from "@src/db.ts";
import { SimpleBotCommand } from "@src/processors/commandProcessor.ts";

export const clearChatContext: SimpleBotCommand = {
  args: undefined,
  name: "clear_list",
  description:
    `В случае если пользователь просит тебя перезагрузится то можешь выполнить эту команду`,
  callback: async (ctx) => {
    await db.delete(["chat", ctx.msg?.chat.id || ""])
    return "Перезагрузка завершена!"
  },
};