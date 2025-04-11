import type { BotContext } from "@src/context.ts";

import { Middleware } from "@grammy";
import { checkIsBotShouldAnswer } from "@src/middleware/checkIsBotShouldAnswer.ts";
import { checkMessageIsExpired } from "@src/middleware/checkMessageIsExpired.ts";
import { checkUserIsAdmin } from "@src/middleware/checkUserIsAdmin.ts";
import { updateUserProfile } from "@src/middleware/updateUserProfile.ts";
import { getCurrentProfile, getDefaultProfile } from "@src/utils/botProfiles.ts";

export const middleware: Middleware<BotContext> = async (ctx, next) => {
  const isMessageExpired = checkMessageIsExpired(ctx);
  const isBotReplayed = ctx.msg?.reply_to_message?.from?.id === ctx.me.id;
  let botProfile = await getCurrentProfile(ctx.msg?.chat.id || 0);
  if(botProfile === undefined){
    botProfile = getDefaultProfile();
  }
  ctx.config = {
    user: await updateUserProfile(ctx),
    isAdmin: checkUserIsAdmin(ctx.from?.id),
    botProfile: botProfile,
    botShouldReply: !isMessageExpired &&
      (isBotReplayed || checkIsBotShouldAnswer(botProfile.triggers, ctx.msg?.text)),
  };

  await next();
};
