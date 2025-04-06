import type { BotContext } from "@src/context.ts";

import { Middleware } from "@grammy";
import { checkIsBotShouldAnswer } from "@src/middleware/checkIsBotShouldAnswer.ts";
import { checkUserIsAdmin } from "@src/middleware/checkUserIsAdmin.ts";
import { updateUserProfile } from "@src/middleware/updateUserProfile.ts";
import { checkMessageIsExpired } from "@src/middleware/checkMessageIsExpired.ts";

export const middleware: Middleware<BotContext> = async (ctx, next) => {
  const isMessageExpired = checkMessageIsExpired(ctx);
  const isBotReplayed = ctx.msg?.reply_to_message?.from?.id === ctx.me.id;

  ctx.config = {
    user: await updateUserProfile(ctx),
    isAdmin: checkUserIsAdmin(ctx.from?.id),
    botShouldReply: !isMessageExpired &&
      (isBotReplayed || checkIsBotShouldAnswer(ctx.msg?.text)),
  };

  await next();
};
