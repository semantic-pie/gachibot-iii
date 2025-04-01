import { Middleware } from "@grammy";
import type { BotContext } from "@src/context.ts";
import { updateProfile } from "@src/utils/userProfile.ts";
import { isAdmin } from "@src/utils/userAdmin.ts";
import { shouldIAnswer } from "@src/utils/shouldIAnswer.ts";

export const middleware: Middleware<BotContext> = async (ctx, next) => {
  ctx.config = {
    user: await updateProfile(ctx),
    isAdmin: isAdmin(ctx.from?.id),
    shouldBreakIn: await shouldIAnswer(ctx.msg?.text),
  };

  await next();
};
