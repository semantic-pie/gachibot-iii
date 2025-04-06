import { BotContext } from "@src/context.ts";

import { createCommandsPrompt } from "@src/utils/generateCommandsPrompt.ts";
import { commands } from "@src/processors/commandProcessor.ts";

export const botTools = (ctx: BotContext) => {
  const current = createCommandsPrompt(
    `Описание команд, доступных Билли:\n[[COMMANDS]]`,
    commands,
  );
  ctx.reply(current ?? "Пусто...");
};
