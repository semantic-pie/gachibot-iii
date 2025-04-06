import { BotContext } from "@src/context.ts";

export const userProfile = (ctx: BotContext) => {
  ctx.reply(ctx.config.user?.profile ?? "Пусто пока!");
};
