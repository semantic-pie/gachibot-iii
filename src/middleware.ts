import { Middleware } from "@grammy";
import type { BotContext } from "@src/context.ts";
import { shouldIAnswer } from "@src/utils/shouldIAnswer.ts";
import { isAdmin } from "@src/utils/userAdmin.ts";
import { updateProfile } from "@src/utils/userProfile.ts";

export const middleware: Middleware<BotContext> = async (ctx, next) => {
  const userName =
    ctx.msg?.from?.first_name +
    " " +
    (ctx.msg?.from?.last_name ? ctx.msg?.from.last_name : "");
  console.log("msg.", userName + ":" + ctx.msg?.text);

  ctx.config = {
    user: await updateProfile(ctx),
    isAdmin: isAdmin(ctx.from?.id),
    shouldBreakIn: await shouldIAnswer(ctx.msg?.text),
  };
  await next();
};
