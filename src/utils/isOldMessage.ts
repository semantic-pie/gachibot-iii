import { BotContext } from "@src/context.ts";

const MESSAGE_EXPIRE_IN_SECONDS = 30;

export const isOldMessage = (ctx: BotContext) => {
    if (ctx.msg?.date) {
        const now = Math.floor(Date.now() / 1000);

        const expired = (now - ctx.msg.date) > MESSAGE_EXPIRE_IN_SECONDS
        if (expired) console.log('Founded expired message: ', ctx.msg?.text?.slice(0, 20))
        return expired;
    } else {
        return true
    }
}
