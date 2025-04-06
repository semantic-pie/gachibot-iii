import { BotContext } from "@src/context.ts";
import { getProfile } from "@src/processors/utils/processBotProfileUpdate.ts";

export const botProfile = async (ctx: BotContext) => {
  const current = await getProfile();
  ctx.reply(current ?? "Пусто...");
};
