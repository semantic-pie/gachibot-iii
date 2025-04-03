import { Middleware } from "@grammy";
import type { BotContext } from "@src/context.ts";
import { shouldIAnswer } from "@src/utils/shouldIAnswer.ts";
import { isAdmin } from "@src/utils/userAdmin.ts";
import { updateProfile } from "@src/utils/userProfile.ts";
import { isOldMessage } from "@src/utils/isOldMessage.ts";

export const middleware: Middleware<BotContext> = async (ctx, next) => {
  const isExpired = isOldMessage(ctx)

  ctx.config = {
    user: await updateProfile(ctx),
    isAdmin: isAdmin(ctx.from?.id),
    isOldMessage: isExpired,
    shouldBreakIn: isExpired ? 0 : shouldIAnswer(ctx.msg?.text),
  };

  console.log("message recived: ", ctx.msg?.text)

  await next();
};
