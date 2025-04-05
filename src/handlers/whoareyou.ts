import { BotContext } from "@src/context.ts";
import { getProfile } from "@src/utils/botProfile.ts";

export const whoareyou = async (ctx: BotContext) => {
    const current = await getProfile()
    ctx.reply(current ?? "Empty profile");
  }

