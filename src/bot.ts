import { Bot } from "@grammy";
import { BotContext } from "@src/context.ts";
import { middleware } from "@src/middleware.ts";
import { message } from "@src/handlers/message.ts";
import { whoami } from "@src/handlers/whoami.ts";

const bot = new Bot<BotContext>(Deno.env.get("BOT_TOKEN") || "");

bot.use(middleware);

bot.command("whoami", whoami);

bot.on("message", message);

export default bot;
