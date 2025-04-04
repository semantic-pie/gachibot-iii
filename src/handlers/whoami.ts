import { BotContext } from "@src/context.ts";

export const whoami = (ctx: BotContext) => {
    ctx.reply(ctx.config.user?.profile ?? "Empty profile");
    ctx.reply(
      ctx.config.user?.history
        .map((i) => `[${i.role}] ${i.name}: ${i.content}`)
        .join("\n") ?? "Empty history"
    );
  }

