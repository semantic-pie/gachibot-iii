import { BotContext } from "@src/context.ts";

export const whoami = (ctx: BotContext) => {
    ctx.reply(ctx.config.user?.profile ?? "Empty profile");
  }

